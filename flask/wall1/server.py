from flask import Flask, redirect, render_template, request, session, flash
import re
from mysqlconnection import MySQLConnector
from flask.ext.bcrypt import Bcrypt 

app = Flask(__name__)
mysql = MySQLConnector(app, 'wall1')
bcrypt = Bcrypt(app)
app.secret_key = 'wordpass'

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# landing
@app.route('/', methods=['GET'])
def landing():
	return render_template('landing.html')

# register
@app.route('/register/', methods=['POST'])
def register():
	# validations, presence for most, regex for email, and matching for pw
	error = False
	if len(request.form['first']) < 1:
		error = True
		flash("need a first name, yo!")
	if len(request.form['first']) > 45:
		error = True
		flash("first name is too big for DB, yo!")
	if len(request.form['last']) < 1:
		error = True
		flash("need a last name!")
	if len(request.form['last']) > 45:
		error = True
		flash("too much last name")
	if len(request.form['password']) < 1:
		error = True
		flash("you should have a password")
	if len(request.form['email']) < 1:
		error = True
		flash("email is a thing that you should have!")
	if not EMAIL_REGEX.match(request.form['email']):
		error = True
		flash("are you sure you know how to email?")
	# add a check for uniqueness
	if not request.form['password'] == request.form['confirm_password']:
		error = True
		flash("passwords gotta match")
	if error == True:
		return redirect('/')
	else:
		# register user
		query = "INSERT INTO users (first, last, email, password, created_at, updated_at) VALUES (:first, :last, :email, :password,NOW(),NOW());"
		data = {
			'first': request.form['first'],
			'last': request.form['last'],
			'email': request.form['email'],
			'password': bcrypt.generate_password_hash(request.form['password'])
		}
		mysql.query_db(query, data)
		# login user
		query = "SELECT * FROM users WHERE email = :email"
		data = {
			'email': request.form['email'],
		}
		curr_user = mysql.query_db(query, data)
		session['user'] = curr_user[0]	
		return redirect('/main/')

# the wall
@app.route('/main/', methods = ['GET'])
def wall_main():
	if not session['user']:
		return redirect('/')

	query_messages = "SELECT * FROM wall1.messages"
	all_messages = mysql.query_db(query_messages)

	query_comments = "SELECT * FROM comments"
	all_comments = mysql.query_db(query_comments)

	query_users = "SELECT * FROM users"
	all_users = mysql.query_db(query_users)

	context = {
		'user': session['user'],
		'messages': all_messages,
		'comments': all_comments,
		'all_users': all_users,
	}
	return render_template('wall.html', context = context)

# login
@app.route('/login/', methods = ["POST"])
def login():
	# login user
	query = "SELECT * FROM users WHERE email = :email"
	data = {
		'email': request.form['email'],
	}
	curr_user = mysql.query_db(query, data)
	if not len(curr_user) == 1:
		flash("  is your email correct? ")
		return redirect('/')
	if not bcrypt.check_password_hash( curr_user[0]['password'], request.form['password'] ):
		flash(" is yousa got the right password? ")
		return redirect('/')

	session['user'] = curr_user[0]	
	return redirect('/main/')

# create post
@app.route('/message/create', methods=['POST'])
def create_message():
	# if len(request.form['message']) < 3:
	# 	flash(" you needa bigger message ")
	# 	return redirect
	print session['user']['id']
	query = "INSERT INTO messages (message, Users_id, created_at, updated_at) VALUES (:message, :Users_id, NOW(),NOW());"
	data = {
		'message': request.form['message'],
		'Users_id': session['user']['id'],
	}
	mysql.query_db(query, data)
	return redirect('/main/')	

# create comment
@app.route('/comment/create', methods=['POST'])
def create_comment():
	query = "INSERT INTO comments (comment, Users_id, Messages_id, created_at, updated_at) VALUES (:comment, :Users_id, :Messages_id, NOW(), NOW());"
	data = {
		'comment': request.form['comment_id'],
		'Users_id': session['user']['id'],
		'Messages_id': request.form['message'],
	}
	myspq.query_db(query, data)
	
# logout
@app.route('/logout/', methods=['GET'])
def logout():
	session['user'] = None
	return redirect('/')

app.run(debug=True)