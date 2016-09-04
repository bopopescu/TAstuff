from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Lead(models.Model):
	first = models.CharField(max_length=100)
	last = models.CharField(max_length=100)
	email = models.EmailField(max_length=100)
	regdate = models.DateField()
	created_at = models.DateTimeField(auto_now_add=True)
	udpated_at = models.DateTimeField(auto_now=True) 

	def __str__(self):
		return self.first