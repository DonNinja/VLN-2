from django.shortcuts import render
from manufacturer.models import Manufacturer

# Create your views here.

def index(request):
    context = {'manufacturer': Manufacturer.objects.all()}
    return render(request, 'manufacturer/index.html', context)
