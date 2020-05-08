from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from account.models import Account

# Create your views here.

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():

            form.save()

            user = authenticate(request, username=request.POST['username'], password=request.POST['password1'])

            login(request, user)

            profile = Account(acc_id=request.user)
            profile.save()
            
            return redirect('profile')
    else:
        return render(request, 'user/register.html', {
            'form': UserCreationForm()
        })

def edit_profile(request):
    if request == 'POST':
        pass
    else:
        current_user = request.user
        user_id = current_user.id
        return render(request, 'profile/edit_profile.html', {
        'account': get_object_or_404(Account, acc_id=user_id),
        'dj_name': current_user.username
})

def profile(request):
    if request == 'POST':
        pass
    else:
        current_user = request.user
        user_id = current_user.id
        return render(request, 'profile/profile.html', {
        'account': get_object_or_404(Account, acc_id=user_id),
        'dj_name': current_user.username
})

def logout(request):
    logout(request)
