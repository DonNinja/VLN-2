from django.shortcuts import render
from product.models import Product

# Create your views here.
def index(request):
    ''' Disp the home page '''
    context = {'product': Product.objects.all().filter(on_sale=True)}
    context['loop_times'] = range(0, len(context['product']))
    return render(request, 'captain/index.html', context)