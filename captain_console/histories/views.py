from django.shortcuts import render, get_object_or_404
from histories.models import Search_history, Purchase_history
from account.models import Account

# Create your views here.

def search_index(request):
    """displays users search history"""
    login_id = request.user.id
    context = {'histories': Search_history.objects.all().filter(acc_id=login_id).order_by('-date')}     # get users search history
    return render(request, 'profile/histories/search_history.html', context)

def purchase_index(request):
    """displays users purchase history"""
    login_id = request.user.id
    context = {'histories': Purchase_history.objects.all().filter(acc_id=login_id).order_by('-date')}     # get users purchase history
    return render(request, 'profile/histories/purchase_history.html', context)