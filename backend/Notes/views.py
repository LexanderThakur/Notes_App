
from django.http import HttpResponse, JsonResponse
from Notes.models import Note
import json


def get_note(request):
    notes=[]

    qs=Note.objects.all()
    """
    title= models.CharField(max_length=100)
    content= models.CharField(max_length=2000)
    created_at= models.DateField(auto_now_add=True)
    """
    for q in qs:
        notes.append(

            {
                "id":f"{q.id}",
                "content":f"{q.content}",
                "created_at":f"{q.created_at}"
            }
        )

    return JsonResponse({"notes":notes})



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