from flask import Flask, render_template, request
from mysqlconnection import MySQLConnector
import math
from datetime import date

app = Flask(__name__)
mysql = MySQLConnector(app,'jaxleads')
app.secret_key = 'shercretkerr'

@app.route('/')
def main():
	query = "SELECT * FROM leads"
	all_leads = mysql.query_db(query)
	# build leads object

	leads_obj = [lead for lead in all_leads]

	for lead in all_leads:
		lead['regdate']=lead['regdate'].isoformat()

	# build links object
	query = "SELECT count(id) FROM leads"
	count = mysql.query_db(query)
	num_links = int(math.ceil(float(count[0]['count(id)'])/3))
	links_obj = []

	for i in range(0, num_links):
		links_obj.append('/leads/'+ str(i+1) + '/')

	return render_template('main2.html', leads = all_leads, links = links_obj)

@app.route('/leads/search/' ,methods=['POST'])
def search():
	query = " SELECT * FROM leads WHERE (first LIKE concat('%', :name , '%') OR last LIKE concat('%', :name , '%')) "
	# query = """ SELECT * FROM leads WHERE (first LIKE concat('%', :name , '%')
	# 			OR last LIKE concat('%', :name , '%'))
 #                AND regdate > :start
 #                AND regdate < :end """
	data = {
    	'name':	request.form['name'] if request.form['name'] else '',
    	# 'start':request.form['start_date'],
    	# 'end':	request.form['end_date']
    }
	print data['name']
	print query 
	leads = mysql.query_db(query, data)
	print leads
	searched_leads = []
	# print leads
	# for lead in leads:
	# 	lead['regdate']=lead['regdate'].isoformat()

	num_links = 0
	# for lead in searched_leads:
	# 	lead['regdate'] = lead['regdate'].isoformat()
	# 	num_links += 1

	links_obj = []
	for i in range(0, num_links):
		links_obj.append('/leads/' + str(i+1) + '/')

	return render_template('main2.html', leads = leads, links = links_obj)


app.run(debug=True)

