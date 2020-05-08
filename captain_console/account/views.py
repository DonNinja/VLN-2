from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from account.models import Account
from django.core.files.storage import default_storage

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
            return redirect('register')
    else:
        return render(request, 'user/register.html', {
            'form': UserCreationForm()
        })

def edit_profile(request):
    if request.method == 'POST':
        userN = request.POST['username']
      
        if len(userN) >= 1 and len(userN) <= 50:
            request.user.username = userN

        if len(request.FILES) != 0:
            new_img = request.FILES['img']

            curr_user = get_object_or_404(Account, acc_id=request.user)
            filename = default_storage.save(new_img.name, new_img)
            curr_user.profile_image = new_img
            curr_user.save()
        
        request.user.save()

        return redirect('profile')
        
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
