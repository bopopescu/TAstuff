from flask import Flask, render_template, request
from mysqlconnection import MySQLConnector
import math
from datetime import date

app = Flask(__name__)
mysql = MySQLConnector(app,'jaxleads')


@app.route('/')
def main2():
	query = "SELECT * FROM leads"
	all_leads = mysql.query_db(query)
	# build leads object

	leads_obj = [lead for lead in all_leads]

	for lead in all_leads:
		lead['regdate']=lead['regdate'].isoformat

	# build links object
	query = "SELECT count(id) FROM leads"
	count = mysql.query_db(query)
	num_links = int(math.ceil(float(count[0]['count(id)'])/3))
	links_obj = []

	for i in range(0, no_links):
		links_obj.push('/leads/'+ str(i+1) + '/')

	return render_template('/partials/main2.html', leads = all_leads, links = links_obj)

app.run(debug=True)

