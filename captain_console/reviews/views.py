from django.shortcuts import render, get_object_or_404
from reviews.models import Review
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
            review_form.product = get_object_or_404(Product, pk=id)
            review_form.save()
            return redirect("/")

    context = {"form": ReviewForm(),
            "name": get_object_or_404(Product, pk=id)}
    return render(request, "reviews/create_review.html", context)

def review_index(request):
    context = {'reviews': Review.objects.all()}
    return render(request, 'reviews/review_index.html', context)

def get_review_by_id(request, id):
    # print(get_object_or_404(Review, pk=id))
    return render(request, 'reviews/review_details.html', {
        'reviews': get_object_or_404(Review, pk=id)
})

def get_review_by_product(request, id):
    prod = get_object_or_404(Product, pk=id)
    context = {'reviews': Review.objects.all().filter(product_id=id), 
                "product_id": id,
                "product_image": prod.image}
    # for rev in Review.objects.all():
    #     for item in Product.objects.all():
    #         if item.id == rev.product.id:
    #             context[rev.id] = rev
    #             print(context)
    print(context)
    return render(request, 'reviews/review_index.html', context)
