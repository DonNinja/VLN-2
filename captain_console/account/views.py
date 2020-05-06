from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from account.models import Account

# Create your views here.

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            print("i got to is valid")
            form.save()
            print("i saved")
            user = authenticate(request, username=request.POST['username'], password=request.POST['password1'])
            print("i authed the user")
            login(request, user)
            print("i logged the user in")
            profile = Account(name=request.POST['username'], acc_id=request.user)
            print("profile")
            profile.save()
            return redirect('profile')
    else:
        return render(request, 'user/register.html', {
            'form': UserCreationForm()
        })

def profile(request):
    if request == 'POST':
        pass
    else:
        current_user = request.user
        user_id = current_user.id
        return render(request, 'profile/profile.html', {
        'account': get_object_or_404(Account, acc_id=user_id)
})

def logout(request):
    logout(request)
