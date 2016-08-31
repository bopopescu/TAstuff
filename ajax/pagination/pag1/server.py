from flask import Flask, render_template, request, session
from mysqlconnection import MySQLConnector	
import math
from datetime import date

app = Flask(__name__)
mysql = MySQLConnector(app,'jaxleads')
app.secret_key = 'shortkey'

@app.route('/')
def main():
	# grabs all leads for initial thingy
	query = "SELECT * FROM leads WHERE (first LIKE concat('%','a','%'))"
	# query = "SELECT * FROM leads"
	leads_obj = mysql.query_db(query)

	# cleans up datetimes in lead objects
	for lead in leads_obj:
		lead['regdate']=lead['regdate'].isoformat()

	# builds links 0bject
	query_links = "SELECT count(id) FROM leads"
	count = mysql.query_db(query_links)
	no_links = int(math.ceil(float(count[0]['count(id)'])/3))
	session['links_obj'] = {}
	for i in range (1, no_links + 1):
		session['links_obj'][i]='/leads/'+ str(i) + '/'

	# builds leads_object and paginates it
	session['leads'] = leads_obj
	print session['leads']
	# y is number of links("tens places")
	# x is leads/page("ones place, or 3...")


	# session['leads_pages'] = [[session['leads'][x+(3*y)] or None for x in range(0,3)] for y in range(0,no_links)]
	session['leads_pages'] = [[] for page in range(0, no_links)]

	# what if we make a single dimension array and just access it like its 2 dimensinoal?

	# determines which page we can see, [0] on load
	the_page = session['leads_pages'][0]


	return render_template('main.html', the_page = the_page)

# this gets the datas that we want to display
@app.route('/leads/search/', methods = ['POST', 'GET'])
def search():
	# query based off of form
	query = """	SELECT * FROM leads
				WHERE first LIKE concat('%',:name,'%')
				OR last LIKE concat('%',:name,'%')"""
				# AND regdate > :start_date
				# AND regdate < :end_date"""
	data = {
		'name'		: request.form['name'],
		# 'start_date': request.form['after_date'] or 'null',
		# 'end_date'	: request.form['before_date'] or 'null',
	}
	results = mysql.query_db(query, data)
	print '-1-'*10
	print results
	print '-1-'*10
	# cleans up datetimes in results objects
	# for result in results:
	# 	result['regdate']=result['regdate'].isoformat()

	# builds links 0bject
	query_links = """SELECT count(id) FROM leads
				WHERE first LIKE concat('%',:name,'%')
				OR last LIKE concat('%',:name,'%')"""
				# AND regdate > :start_date
				# AND regdate < :end_date"""
	data = {
		'name': request.form['name'],
	}
	count = mysql.query_db(query_links,data)
	no_links = int(math.ceil(float(count[0]['count(id)'])/3))
	session['links_obj'] = {}
	for i in range (1, no_links + 1):
		session['links_obj'][i]='/leads/'+ str(i) + '/'

	# builds leads_object and paginates it
	session['leads'] = results
	print '-2-'*10
	print request.form
	print data['name']
	print session['leads']
	print session['leads'][0]
	print '-2-'*10
	session['leads_pages'] = [[session['leads'][x+(3*y)] for x in range(0,3)] for y in range(0,no_links)]

	the_page = session['leads_pages'][0]
	return render_template('main.html', the_page = the_page, results = results)


# this gets the number of pages we will need and 
@app.route('/leads/<page>/', methods = ["GET","POST"])
def leads(page):
	lead_page = session['leads_pages'][int(page)-1]
	return render_template('main.html', the_page = lead_page)






app.run(debug=True)