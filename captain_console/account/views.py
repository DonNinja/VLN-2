from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        return render(request, 'user/register.html', {
            'form': UserCreationForm()
        })

def get_profile(request):
    return render(request, 'profile/profile.html', {
        'profile'
    })