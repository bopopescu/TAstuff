from django import forms

class FlashyForm(forms.Form):
	info    =	forms.CharField(max_length= 140)
	error   = 	forms.CharField(max_length=140)
	success = 	forms.CharField(max_length=140)
	warning = 	forms.CharField(max_length=140)
	crucial = 	forms.CharField(max_length=140)
	happy   =	forms.CharField(max_length=140)
	LEVEL_CHOICES = [
		('20', 'info'),
		('25', 'success'),
		('40', 'error'),
		('30', 'warning'),
		('50', 'crucial')
	]
		
		
	level = forms.ChoiceField(LEVEL_CHOICES)