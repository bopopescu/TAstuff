from django.shortcuts import render, redirect
from django.contrib import messages
from.forms import FlashyForm

# Create your views here.
def main(request):
	context = {
		'flashy_form': FlashyForm()
	}
	return render(request,'flash_form/main.html', context)

CRUCIAL = 50

def success(request):
	if request.method == "POST":

		form = FlashyForm(request.POST)

		if form.is_valid():		

			

			messages.info(request, request.POST['info'])
			messages.error(request, request.POST['error'])
			messages.success(request, request.POST['success']) 
			messages.warning(request, request.POST['warning'])
			messages.add_message(request, CRUCIAL, request.POST['crucial'])
			messages.info(request, request.POST['happy'], extra_tags='happy')


			# messages.set_level(request, request.POST['level'])

			return render(request, 'flash_form/success.html')

		else:
			return render(request, 'flash_form/main.html', {flash_form: form})

	else:
		return redirect('/')