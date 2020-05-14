from django.shortcuts import render, get_object_or_404
from reviews.models import Review, Review_Connector
from account.models import Account
from reviews.Forms import ReviewForm
from product.models import Product
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required()
def create_review(request, id):
    """processes users review"""
    if request.method == "POST":
        form = ReviewForm(request.POST)
        
        if form.is_valid():     # check if inputs are valid

            review_form = form.save(commit=False)
            review_form.acc_id = request.user
            product = get_object_or_404(Product, pk=id)
            review_form.product = product

            review_form.save()
            
            profile = get_object_or_404(Account, acc_id=request.user)

            rev_connector = Review_Connector(acc_id=request.user, product_id=product , profile_id=profile, review_id=review_form)   # connector for account product and review
            rev_connector.save()

            return redirect(f"/reviews/product/{id}")   # redirect user to the review page of the product

    context = {"form": ReviewForm(),
            "name": get_object_or_404(Product, pk=id)}
    return render(request, "reviews/create_review.html", context)

def review_index(request):
    """Renders all reviews (not accessible by navigation on the site)"""
    context = {'reviews': Review.objects.all()}
    return render(request, 'reviews/review_index.html', context)

def get_review_by_id(request, id):
    """get individual review and return render"""
    review = get_object_or_404(Review, pk=id)

    return render(request, 'reviews/review_details.html', {
        'reviews': review
})

def get_review_by_product(request, id):
    """get reviews of certain product and return render"""
    prod = get_object_or_404(Product, pk=id)    # get product
    related = Review_Connector.objects.all().select_related().filter(product_id=id)
    context = {'review_connected': related, 
                "product_id": id,
                "product_image": prod.image}
    return render(request, 'reviews/review_index.html', context)
