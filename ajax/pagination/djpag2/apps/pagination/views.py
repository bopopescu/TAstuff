from django.shortcuts import render
from django.views.generic import View
from .models import Lead

# Create your views here.

# searches (blank or not) go to ORM and get results
# results is turned into an array
# - or -
# does it make a book? no se...





# Load Page
# GET to /leads/
# could be a blank submission of the form
# POST to /leads/
# submitting the form shold reload leads results
class Leads(View):
	def get(self, request):
		
		# get blank form results
		leads = Lead.objects.all()
		# paginate ....
		# a. links object
		# b. pages object

		# page 0
		request.session['page'] = 0

		
		# render that bad boy
		return render('main.htmld')

# clicking a, uhhh, link should reload the table partial
# should come from a get to leads/(P?<page>)
# updates the session's page

# front end looks at page of book to load


