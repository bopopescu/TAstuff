from django.conf.urls import url
from .views import Main
from . import views

urlpatterns = [
	url(r'^$', Main.as_view()),
	url(r'^leads/$', Main.as_view()),
	url(r'^leads/(?P<page>)', views.paginate ),
]