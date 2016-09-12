from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Lead(models.Model):
	first = models.CharField(max_length=50)
	last = models.CharField(max_length=50)
	email = models.ChardField(max_lenght=100)
	created_at = models.DateTiemField(auto_no_add=True)
	updated_at = models.DateTimeField(auto_now_add=True)