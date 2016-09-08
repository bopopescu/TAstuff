from flask import Flask, redirect, session, render_template, flash
import re
from flash.ext.bcrypt import Bcrypt 
from myscqlconnection import MySQLConnector

app = Flask(__name__)
app.secret_key = 'thingythingythingy'
bcrypt = Bcrypt(app)
mysql = MySQLConnector(app,'wall2')

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

@app.route('/', methods=['GET'])
def landing():
	return render_template('main.html')

@app.route('/login/', methods=['POST'])
def login():
	query = "SELECT * FROM users WHERE email = :email"
	data = { 'email': request.form['email'] }
	user = mysql.query_db(query, data)
	if not len(user) == 1:
		flash("email is not the thingy dude(ette)")
		return redirect('/')
	if not bcrypt.check_password_hash(user[0]['password'], request.form['password']):
		flash("dat pw doe")
		return redirect('/')
	session['user'] = user[0]
	return redirect('/main/')

@app.route('/register/', methods=['POST'])
def register():
	errors = False
	if len(request.form['first']) < 1:
		errors = True
		flash("need a first")
	if len(request.form['email']) < 1:
		errors = True
		flash("need a last")
	if not EMAIL_REGEX.match(request.form['email']:
		errors = True
		flash("need a email")
	if not request.form['password'] == request.form['c_password']:
		errors=True
		flash("pws gotta match")
	query = "INSERT INTO users (first, last, email, password, created_at, updated_at) VALUES (:first, :last, :email, password, NOW(), NOW())"
	data = {
		'first': request.form['first'],
		'last': request.form['last'],
		'email': request.form['email'],
		'password': bcrypt.generate_password_hash(request.form['password'])
	}
	mysql.query_db(query, data)

	query = "Select * from users WHERE email = :email"
	data = {'email': request.form['email']}
	curr_user = mysql.query_db(query, data)
	session['user'] = curr_user[0]
	return redirect('/main/')

@app.route('/main/', methods=['GET'])
def main():
	if not session['user']:
		return redirect('/')

	query = "SELECT * FROM messages JOIN users ON messages.users_id = users.id"
	all_messages = mysql.query_db(query)

	query = "SELECT * FROM comments JOIN users ON comments.users_id = comments.id"
	all_comments = mysql.query_db(query)

	context = {
		'messages': all_messages,
		'comments': all_comments
	}
	return render_template('main.html', context = context)

@app.route('/comment/create', methods=['POST'])
def commentify():
	query = "INSERT INTO comments (comment, users_id, messages_id, created_at, updated_at) VALUES (:comment, :user_id, :message_id, NOW(), NOW())"
	data = {
		'comment': request.form['comment'],
		'user_id': session['user']['id'],
		'message_id': request.form['message_id'],
	}
	mysql.query_db(query, data)
	return redirect('/main/')

@app.route('/message/create', methods=['POST'])
def messageify():
	query = "INSERT INTO messages (message, users_id, created_at, updated_at) VALUES (:message, :user_id, NOW(), NOW())"
	data = {
		'message': request.form['message'],
		'user_id': session['user']['id']
	}
	mysql.query_db(query, data)
	return redirect('/main/')

@app.route('/logout/', methods=['GET'])
def logout():
	session['user'] = None
	return redirect('/')



app.run(debug=True)