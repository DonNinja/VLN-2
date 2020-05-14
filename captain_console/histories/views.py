from django.shortcuts import render, get_object_or_404
from histories.models import Search_history
from account.models import Account

# Create your views here.

def search_index(request):
    login_id = request.user.id
    context = {'histories': Search_history.objects.all().filter(acc_id=login_id).order_by('-date')}
    return render(request, 'profile/histories/search_history.html', context)

