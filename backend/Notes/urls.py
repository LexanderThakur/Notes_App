from django.urls import path
from . import views
urlpatterns=[
    path("save/",views.save_note),
    path("get_notes/",views.get_note),
]