from flask import Flask, render_template, request, redirect, jsonify
from mysqlconnection import MySQLConnector

app = Flask(__name__)
mysql = MySQLConnector(app, 'notes')

@app.route('/')
def notes():
	return render_template('notes.html')

@app.route('/notes/partials/all_notes')
def all_notes_partial():
	query = "SELECT * FROM notes"
	all_notes = mysql.query_db(query)
	return render_template('partials/notes.html', notes=all_notes)

@app.route('/notes/add', methods = ['POST'])
def add_note():
	query = """ INSERT INTO notes (title, description, updated_at, created_at)
				VALUES (:title, 'nodescription yet', NOW(), NOW())"""
	data = { 'title': request.form['note_title'] }
	mysql.query_db(query, data)
	query = "SELECT * FROM notes"
	all_notes = mysql.query_db(query)
	return render_template('partials/notes.html', notes=all_notes)

@app.route('/note/edit', methods=['POST'])
def edit_note():
	query = """ UPDATE notes
				SET description = :description, updated_at = NOW()
				WHERE id = :id"""
	data = {
		'id': request.form['note_id'],
		'description': request.form['note_description']
	}
	mysql.query_db(query, data)
	query = "SELECT * FROM notes"
	all_notes = mysql.query_db(query)
	return render_template('partials/notes.html', notes = all_notes)

@app.route('/notes/delete', methods=['POST'])
def delete_note():
	query = "DELETE FROM notes WHERE id = :id"
	data = { 'id': request.form['note_id']}
	mysql.query_db(query, data)
	query = "SELECT * FROM notes"
	all_notes = mysql.query_db(query)
	return render_template('partials/notes.html', notes=all_notes)

app.run(debug=True)