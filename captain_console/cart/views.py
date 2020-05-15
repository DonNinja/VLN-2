from django.shortcuts import render, get_object_or_404, redirect
from product.models import Product
from cart.models import Cart
from histories.models import Purchase_history, Search_history
from django.http import JsonResponse, Http404
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required()
def cart_index(request):
    '''Gets all items that the current user has added
    to his cart, displays them for him'''
    login_id = request.user.id
    total_price, cart_content = calc_cart_items(login_id)
    context = {'cart': cart_content,
                'total':total_price}
    return render(request, 'profile/cart/cart.html', context)

def add_to_cart(request, id):
    ''' Takes in an id and adds that item to the users cart'''
    if request.user.is_authenticated and request.method == "POST":
        login_id = request.user.id 
        item = get_object_or_404(Product, pk=id)
        cart = Cart(product_id=item, acc_id=request.user)
        cart.save()
        return JsonResponse({"status": "Item added to cart" })
    else:
        raise Http404("User not logged in")

def remove_from_cart(request):
    ''' Takes in an id and removes that item from the users cart'''
    if request.method == "DELETE":
        login_id = request.user.id 
        cart_id = request.body.decode('ascii').split('=')[1]
        cart = get_object_or_404(Cart, pk=cart_id)
        if cart:
            cart.delete()
        return JsonResponse({"status": "Item removed from cart" })


def empty_cart(request):
    ''' Empties the current users cart and saves it to purchase history'''

    if request.method == "DELETE":

        login_id = request.user.id

        cart_content = Cart.objects.all().filter(acc_id=login_id)
        
        for item in cart_content:
            # saves all the object that the user baught to his historie
            Purchase_history(purchase=item.product_id, acc_id=request.user).save()

        cart_content.delete()
        return JsonResponse({"status": "All items have been removed from cart" })



def render_contact_info(request):
    return render(request, 'profile/cart/contact_info.html')

def render_overview(request):
    '''Gets all products in cart and renders them to the user'''
    login_id = request.user.id
    total_price, cart_content = calc_cart_items(login_id)
    context = {'cart': cart_content,
                'total':total_price}
    return render(request, 'profile/cart/overview.html', context)

def render_payment(request):
    return render(request, 'profile/cart/payment.html')

def calc_cart_items(user_id):
    '''Function to calculate and format the ammount of money in a cart'''
    cart_content = Cart.objects.all().filter(acc_id=user_id)
    total_price = 0
    for item in cart_content:
        total_price += int(item.product_id.price)  # getting all of the amounts
    total_price = '{:20,.2f}'.format(total_price)  # moneyZ
    return total_price, cart_content