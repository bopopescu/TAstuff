from flask import Flask, render_template, redirect, session, flash
from mysqlconnection import MySQLConnector
import re
from flask.ext.bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = 'secretest key'
mysql = MySQLConnector(app, 'wall1')
bcrypt = Bcrypt(app)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

app.route('/', methods=['GET'])
def landing():
	return render_template('landing.html')

app.route('/register/', methods=['POST'])
def register():
	errors = False
	if len(request.form['first']) < 1:
		errors = True
		flash('first name is no bueno')
	if len(request.form['last']) < 1:
		errors = True
		flash('last name is no bueno')
	if len(request.form['password']) < 1:
		errors = True
		flash('u need a password')
	if not request.form['password'] == request.form['c_password']:
		errors = True
		flash('pws not same')
	if not EMAIL_REGEX.match(request.form['email']):
		errors = True
		flash('dat email doe')
	if errors:
		return redirect('/')
	query = "INSERT INTO users (first, last, email, password, created_at, updated_at VALUES (:first, :last, :email, :password, NOW(), NOW())"
	data = {
		'first': request.form['first'],
		'last': request.form['last'],
		'email': request.form['email'],
		'password': bcrypt.generate_password_hash(request.form['password'])
	}
	mysql.query_db(query, data)
	query ="SELECT * FROM users WHERE email = :email"
	data = {'email': request.form['email']}
	session['user'] = mysql.query_db(query, db)[0]
	return redirect('/main/')

app.route('/login/', methods=['POST'])
def login():
	query ="SELECT * FROM users WHERE email = :email"
	data = {'email': request.form['email']}
	user = mysql.query_db(query, db)[0]
	if not user:
		flash('hoo u rly?')
		return redirect('/')
	if not bcrypt.check_password_hash(user['password'], request.form['password']):
		flash('u pw no g')
		return redirect('/')
	session['user']
	return redirect('/main/')

app.route('/main/', methods=['GET'])
def main():
	if not session['user']:
		return redirect('/')

	query = "SELECT * FROM comments JOIN users ON comments.users_id == users.id"
	all_comments = mysql.query_db(query)

	query = "SELECT * FROM messages JOIN users ON messages.users_id == users.id"
	all_messages = mysql.query_db(query)

	context = {
		'messages': all_messages,
		'comments': all_comments
	}
	return render_template('main.html', context = context)

app.route('/message/create', methods=['POST'])
def message_create():
	query = "INSERT INTO messages (message, users_id, created-at, updated_at) VALUES (:message, :users_id, NOW(), NOW())"
	data = {
		'messages': 
		'users_id': session['curr_user']
	}
	mysql.query_db(query, data)
	return redirect('/main/')

app.route('/comment/create', methods=['POST'])
def comment_create():
	query = "INSERT INTO comments (comment, users_id, created-at, updated_at) VALUES (:message, :users_id, NOW(), NOW())"
	data = {
		'comment': request.form['comment'],
		'messages_id': request.form['m_id'],
		'users_id': session['curr_user']
	}
	mysql.query_db(query, data)
	return redirect('/main/')

app.route('/logout/', methods=]'GET')
def logout():
	session['user'] = None
	return redirect('/')


app.run(debug=True)