
from django.http import HttpResponse

def save_note(request):
    return HttpResponse("ok wassup",status=201)   