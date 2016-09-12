from django.conf.urls import url
from .views import Leads

urlpatterns = [
	url(r'/', leads.as_view(), name="leads-main"),
]