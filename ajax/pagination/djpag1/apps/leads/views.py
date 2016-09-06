from django.shortcuts import render
from django.views.generic import View
from .models import Lead
from django.db.models import Q
import math

# Create your views here.
class Main(View):
	# get loads on initial page load
	def get(self, request):

		# NOTE TO SELF NEED TO SESSIONIFY THIS BIDNITZ
		all_leads = Lead.objects.all()
		request.session['exp'] = list(Lead.objects.all())

		leads_list = [lead for lead in all_leads]

		num_links = range(1,int(math.ceil(len(all_leads)/3.0)) + 1)
		# ['', '/leads/1', '/leads/2', '/leads/3']

		links_list = [{'url':'/leads/' + str(i), 'val': i} for i in num_links]



		context = {
			'leads': leads_list,
			'links': links_list
		}

		return render(request, 'main.html', context)

	# post loads on search
	def post(self, request):

		all_leads = Lead.objects.filter(
			Q(first__istartswith=request.POST['name']) | Q(last__istartswith=request.POST['name'])
		)

		leads_list = [lead for lead in all_leads]

		num_links = range(1,int(math.ceil(len(all_leads)/3.0))+1)

		links_list = [{'url':'/leads/'+ str(i), 'val': i} for i in num_links]

		context = {
			'leads': leads_list,
			'links': links_list
		}
		return render(request, 'main.html', context)



		pass

# for dat pagination juju
def paginate(request):
	pass
