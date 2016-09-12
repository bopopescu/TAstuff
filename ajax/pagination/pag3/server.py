from flask import Flask, render_template, request
from mysqlconnection import MySQLConnector
import math

app = Flask(__name__)
mysql = MySQLConnector(app, 'jaxleads')
app.secret_key = 'secretestthingyoueverdidsee'



@app.route('/', methods=['GET', 'POST'])
def main():
	return render_template('main.html')

# initial render(blank form)
@app.route('/getslinks/', methods=['POST'])
def links():
	query = "SELECT * FROM leads WHERE first LIKE concat('%', :name, '%')"
	data = { 'name': request.form['name'] }
	all_leads = mysql.query_db(query, data)

	for lead in all_leads:
		lead['regdate']=lead['regdate'].isoformat()



	links_list = []
	no_links = int(math.ceil(len(all_leads)/4.0))
	for i in range(0, no_links):
		links_list.append('/getsleads/'+str(i))



	return render_template('partials/links.html', links = links_list)

@app.route('/getsleads/<page>', methods=['POST', 'GET'])
def leads(page):
	print('got here 1')
	print (page)
	print (request)
	print (request.form)
	print (request.form.values)
	print ('2')
	query = "SELECT * FROM leads WHERE first LIKE concat('%', :name, '%') LIMIT :num, 4"
	data = { 
		'name': 'a',
		'num': int(page)
	 }
	print(int(page))
	all_leads = mysql.query_db(query, data)

	for lead in all_leads:
		lead['regdate']=lead['regdate'].isoformat()

	leads = list(all_leads)
	print('got here')

	return render_template('partials/leads.html', leads = leads)



app.run(debug=True)