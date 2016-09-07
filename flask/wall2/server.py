from flask import Flask, redirect, render_template, request, session, flash
from mysqlconnection import MySQLConnector
import re
from flask.ext.bcrypt import Bcrypt

app = Flask(__name__)
mysql = MySQLConnector(app, 'wall1')
app.secret_key = 'secretestkey'
bcrypt = Bcrypt(app)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

@app.route('/', methods=['GET'])
def landing():
	return render_template('landing.html')

@app.route('/register/', methods=['POST'])
def register():
	error = False
	if len(request.form['first']) < 1:
		error = True
		flash("need a name yo")
	if len(request.form['last']) <1:
		error = True
		flash('need a name yo')
	if not EMAIL_REGEX.match(request.form['email']):
		error = True
		flash('ur email sucs')
	if request.form['password'] != request.form['c_password']:
		error = True
		flash("passwords gotta thing yo")
	if error == True:
		return redirect('/')
	else:
		query = """INSERT INTO users (first, last, email, password, created_at, updated_at) 
				VALUES (:first, :last, :email, :password, NOW(), NOW())"""
		data = {
			'first': request.form['first'],
			'last': request.form['last'],
			'email': request.form['email'],
			'password': bcrypt.generate_password_hash(request.form['password'])
		}
		mysql.query_db(query, data)

		query_user = "SELECT * FROM users WHERE email = :email"
		data = { 'email': request.form['email']}
		curr_user = mysql.query_db(query_user, data)
		session['user']= curr_user[0]
		return redirect('/main/')



@app.route('/login/', methods=['POST'])
def login():
	query = "SELECT * FROM users WHERE email = :email"
	data = {
		'email' : request.form['email'],
	}
	curr_user = mysql.query_db(query, data)
	if not len(curr_user) == 1:
		flash('this email is jujju-y')
		return redirect('/')
	if not bcrypt.check_password_hash( curr_user[0]['password'], request.form['password']):
		flash('password not thing')
		return redirect('/')

	session['user']=curr_user[0]
	return redirect('/main/')

@app.route('/logout/', methods=['GET'])
def logout():
	session['user'] = None	
	return redirect('/')


@app.route('/main/', methods=['GET'])
def main():
	if not session['user']:
		return redirect('/')

	query_messages = "SELECT * FROM wall1.messages JOIN users ON users.id = messages.users_id"
	all_messages = mysql.query_db(query_messages)

	query_comments = "SELECT * FROM comments JOIN users ON users.id = comments.users_id"
	all_comments = mysql.query_db(query_comments)

	query_users = "SELECT * FROM users"
	all_users = mysql.query_db(query_users)

	context = {
		'user': session['user'],
		'messages': all_messages,
		'comments': all_comments,
		'all_users': all_users
	}
	return render_template('main.html', context = context)

@app.route('/message/create', methods=['POST'])
def create_message():
	query = "INSERT INTO messages (message, users_id, created_at, updated_at) VALUES (:message, :user, NOW(), NOW()"
	data = {
		'message': request.form['message'],
		'user': session['user']['id']
	}
	mysql.query_db(query, data)
	return redirect('/main/')


@app.route('/comment/create', methods=['POST'])
def create_comment():
	query = "INSERT INTO comments (comment, users_id, messages_id, created_at, updated_at) VALUES (:comment, :users_id, :messages_id, NOW(), NOW())"
	data = {
		'comment': request.form['comment'],
		'users_id': session['user']['id'],
		'messages_id': request.form['message_id']
	}
	mysql.query_db(query, data)
	return redirect('/main/')

app.run(debug=True)


