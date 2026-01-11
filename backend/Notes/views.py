
from django.http import HttpResponse, JsonResponse
from Notes.models import Note
import json

def save_note(request):

    data=json.loads(request.body)

    note_text= data.get("note")

    print(Note.objects.all())

    q= Note(
        title="Note",
        content=note_text

    )
    q.save()

    

    
    





    return JsonResponse({"text":"added succesfully"})   