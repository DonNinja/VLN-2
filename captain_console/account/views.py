from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

def register(request):
    if request.method == 'post':
        pass
    else:
        return render(request, 'user/register.html', {
            'form': UserCreationForm()
        })