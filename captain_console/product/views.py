from django.shortcuts import render, get_object_or_404, redirect
from product.models import Product
from django.http import JsonResponse
# Create your views here.

def index(request):
    print("IAMHEre")
    if 'search_filter' in request.GET:
        print('did i even get here')
        search_filter = request.GET['search_filter']
        print(search_filter)
        product = [ {
        'id': x.id,
        'name': x.name,
        'description': x.description,
        'image': x.image,
        'price': x.price
        } for x in Product.objects.filter(name__icontains=search_filter) ]
        return JsonResponse({'data': product })
    context = {'product': Product.objects.all()}
    return render(request, 'product/product_index.html', context)

def filter_product(request, id):
    context = {'product': Product.objects.all().filter(category_id=id)}
    return render(request, 'product/product_index.html', context)

def get_product_by_id(request, id):
    return render(request, 'product/product_details.html', {
        'product': get_object_or_404(Product, pk=id)
})
