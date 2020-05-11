from django.shortcuts import render, get_object_or_404, redirect
from product.models import Product
from cart.models import Cart
from django.http import JsonResponse

# Create your views here.

def cart_index(request):
    login_id = request.user.id

    # product_list = [(i.product_id, i.pk) for i in Cart.objects.all().filter(acc_id=login_id)]
    # context = {'cart':product_list}
    context = {'cart': Cart.objects.all().filter(acc_id=login_id)}
    return render(request, 'profile/cart/cart.html', context)


def add_to_cart(request, id):
    ''' Takes in an id and adds that item to the users cart'''
    # TODO: MAKE THIS INTO A POST REQUEST
    login_id = request.user.id 
    item = get_object_or_404(Product, pk=id)
    cart = Cart(product_id=item, acc_id=request.user)
    cart.save()
    return JsonResponse({"status": "Item added to cart" })

def remove_from_cart(request):
    ''' Takes in an id and adds that item to the users cart'''
    # TODO: MAKE THIS INTO A DELETE REQUEST
    if request.method == "DELETE":
        login_id = request.user.id 
        cart_id = request.body.decode('ascii').split('=')[1]
        cart = get_object_or_404(Cart, pk=cart_id)
        if cart:
            cart.delete()
        return JsonResponse({"status": "Item added to cart" })