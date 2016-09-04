from django.shortcuts import render
from .models import Lead
import math

# Create your views here.
def main(request):
	all_leads = Lead.objects.all()

	leads_list = [lead for lead in all_leads]

	num_links = int(math.ceil(len(all_leads)/3.0))

	link_object = {}
	for i in range(num_links):
		link_object[str(i)]='/leads/' +  str(i)


	context = {
		'leads': leads_list,
		'links': link_object
	}

	return render(request, 'main.html', context)