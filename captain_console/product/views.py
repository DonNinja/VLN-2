from django.shortcuts import render, get_object_or_404, redirect
from product.models import Product
from filterer.models import Category
from manufacturer.models import Manufacturer
from django.http import JsonResponse
from account.models import Account
from histories.models import Search_history
# Create your views here.


def index(request):
    if 'search_filter' in request.GET:
        search_filter = request.GET['search_filter']
        if request.user.is_authenticated:
            user_id = request.user.id
            hist = Search_history(search=search_filter, acc_id=request.user)
            hist.save()

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

def advanced_filter(request):
    products = Product.objects.all()
    if request.GET["name_filter"]:
        products = products.filter(name__icontains=request.GET["name_filter"])
    if request.GET["type_filter"]:
        sel_type = get_object_or_404(Category, name=request.GET["type_filter"])
        products = products.filter(category=sel_type.pk)
    if request.GET["company_filter"]:
        man_type = get_object_or_404(Manufacturer, name=request.GET["company_filter"])
        products = products.filter(manufacturer=man_type)

    return render(request, "product/product_index.html", {"product": products})
