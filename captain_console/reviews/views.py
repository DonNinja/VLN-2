from django.shortcuts import render, get_object_or_404
from reviews.models import Review, Review_Connector
from account.models import Account
from reviews.Forms import ReviewForm
from product.models import Product
from django.shortcuts import render, redirect

# Create your views here.

def create_review(request, id):
    if request.method == "POST":
        form = ReviewForm(request.POST)
        
        if form.is_valid():

            review_form = form.save(commit=False)
            review_form.acc_id = request.user
            product = get_object_or_404(Product, pk=id)
            review_form.product = product

            review_form.save()
            
            profile = get_object_or_404(Account, acc_id=request.user)
            print(review_form)


            rev_connector = Review_Connector(acc_id=request.user, product_id=product , profile_id=profile, review_id=review_form)
            rev_connector.save()

            return redirect(f"/reviews/product/{id}")

    context = {"form": ReviewForm(),
            "name": get_object_or_404(Product, pk=id)}
    return render(request, "reviews/create_review.html", context)

def review_index(request):
    context = {'reviews': Review.objects.all()}
    return render(request, 'reviews/review_index.html', context)

def get_review_by_id(request, id):
    # print(get_object_or_404(Review, pk=id))
    review = get_object_or_404(Review, pk=id)

    return render(request, 'reviews/review_details.html', {
        'reviews': review
})

def get_review_by_product(request, id):
    prod = get_object_or_404(Product, pk=id)
    related = Review_Connector.objects.all().select_related().filter(product_id=id)
    context = {'review_connected': related, 
                "product_id": id,
                "product_image": prod.image}
    return render(request, 'reviews/review_index.html', context)
