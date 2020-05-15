from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from account.models import Account
from django.core.files.storage import default_storage
from django.http import JsonResponse

# Create your views here.

def register(request):
    """Renders the register page for the user if he is navigating to it, takes post request to save user"""
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)      # get form
        print(form.is_valid())
        if form.is_valid():     # check if all inputs are valid

            form.save()

            user = authenticate(request, username=request.POST['username'], password=request.POST['password1'])     # get user

            login(request, user)    # login the user

            profile = Account(acc_id=request.user, first_name=request.POST['id_firstname'], last_name=request.POST['id_lastname'])  # create users profile
            profile.save()      # save profile
            
            return redirect('profile')      # redirect user to their profile page
        else:
            
            errors = form.errors.get_json_data()
            return render(request, 'user/register.html', {
            'form': UserCreationForm(),
            'errors': errors
            })# else if inputs were not valid (i.e. username) stay on the register page
    
    else:       # if not post request render page with form
        return render(request, 'user/register.html', {
            'form': UserCreationForm(),
            'errors': ''
        })

def edit_profile(request):
    """Function for user to edit their profile"""
    if request.method == 'POST':            # if request is post
        userN = request.POST['username']
        firstN = request.POST['firstName']      # get all input fields
        lastN = request.POST['lastName']
        curr_user = get_object_or_404(Account, acc_id=request.user)

        users = Account.objects.all()
      
        if len(userN) >= 1 and len(userN) <= 150:
            for name in users:
                if userN == name.acc_id.username:
                    return render(request, 'profile/edit_profile.html', {
                        "username_exists": "Username is already taken",
                        'account': curr_user,
                        'dj_name': request.user.username
                    })
            request.user.username = userN

        if len(firstN) >=1 and len(firstN) <= 150:      # verify all user name inputs
            curr_user.first_name = firstN
            curr_user.save()      

        if len(lastN) >=1 and len(lastN) <= 150:
            curr_user.last_name = lastN
            curr_user.save()        

        if len(request.FILES) != 0:         # check if user input new profile img
            new_img = request.FILES['img']
            filename = default_storage.save(new_img.name, new_img)
            curr_user.profile_image = new_img
            curr_user.save()

        request.user.save()  

        return redirect('profile')      
        
    else:       # else if not post request
        current_user = request.user     # get user
        user_id = current_user.id
        return render(request, 'profile/edit_profile.html', {       # display users profile
        'account': get_object_or_404(Account, acc_id=user_id),
        'dj_name': current_user.username
})

def profile(request):
    """displays profile page"""
    current_user = request.user
    user_id = current_user.id
    return render(request, 'profile/profile.html', {
    'account': get_object_or_404(Account, acc_id=user_id),
    'dj_name': current_user.username
})

def logout(request):
    """logs out user"""
    logout(request)
