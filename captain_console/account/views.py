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
    if request.method == 'POST':
        userN = request.POST['username']
        # passW1 = request.POST['password1']
        # passW2 = request.POST['password2']
        if len(userN) >= 1 and len(userN) <= 50:
            request.user.username = userN

        # if len(passW1) >= 8 and len(passW1) <= 100:
        #     if passW1 == passW2:
        #         request.user.password = passW1
        #     else:
        #         print("Passwords dont match")
        
        request.user.save()

        return redirect('profile')
        # print("Chuckles, i'm in danger")
        # form = UserForm(data=request.POST, instance=request.user)
        # if form.is_valid():

        #     form.save()

        # user = authenticate(request, username=request.POST['username'], password=request.POST['password1'])

        #     # login(request, user)

        #     profile = Account(name=request.POST['username'], acc_id=request.user)
        #     profile.save()
            
        #     return redirect('profile')
        
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
