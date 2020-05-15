from django.shortcuts import render, get_object_or_404, redirect
from product.models import Product, Product_images
from filterer.models import Category
from manufacturer.models import Manufacturer
from django.http import JsonResponse
from account.models import Account
from histories.models import Search_history
# Create your views here.


def index(request):
    """takes in search and returns render for product page"""
    if 'search_filter' in request.GET:      # check if user searched for something
        search_filter = request.GET['search_filter']    # get search input
        if request.user.is_authenticated:       # if user is logged in
            user_id = request.user.id
            hist = Search_history(search=search_filter, acc_id=request.user)    # save search input to search history
            hist.save()

        product = [ {
        'id': x.id,
        'name': x.name,
        'description': x.description,
        'image': x.image,
        'price': x.price
        } for x in Product.objects.filter(name__icontains=search_filter) ]      # build products that have the search in them
        return JsonResponse({'data': product })
    context = {'product': Product.objects.all()}
    return render(request, 'product/product_index.html', context)

def filter_product(request, id):
    """Function to order products by name or price"""
    context = {'product': Product.objects.all().filter(category_id=id)}
    return render(request, 'product/product_index.html', context)

def get_product_by_id(request, id):
    """gets individual products to be displayed in a more details page"""
    context = {'product': get_object_or_404(Product, pk=id)}
    context["pictures"] = Product_images.objects.all().filter(product=id)
    context["loop_times"] = range(0, len(context['pictures']))
    return render(request, 'product/product_details.html', context)

def advanced_filter(request):
    """Used to filter out products that have a certain manufacturer or of a certain category"""
    products = Product.objects.all()
    if request.GET["name_filter"]:
        products = products.filter(name__icontains=request.GET["name_filter"])      # get search input in filter window
    if request.GET["type_filter"]:
        sel_type = get_object_or_404(Category, name=request.GET["type_filter"])     # get category selection
        products = products.filter(category=sel_type.pk)
    if request.GET["company_filter"]:
        man_type = get_object_or_404(Manufacturer, name=request.GET["company_filter"])  # get manufacturer selection
        products = products.filter(manufacturer=man_type)

    return render(request, "product/product_index.html", {"product": products})
