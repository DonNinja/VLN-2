from django.shortcuts import render, get_object_or_404
from reviews.models import Review
from product.models import Product

# Create your views here.

def review_index(request):
    context = {'reviews': Review.objects.all()}
    return render(request, 'reviews/review_index.html', context)

def get_review_by_id(request, id):
    # print(get_object_or_404(Review, pk=id))
    return render(request, 'reviews/review_details.html', {
        'reviews': get_object_or_404(Review, pk=id)
})

def get_review_by_product(request, id):
    context = {'reviews': Review.objects.all().filter(product_id=id)}
    # for rev in Review.objects.all():
    #     for item in Product.objects.all():
    #         if item.id == rev.product.id:
    #             context[rev.id] = rev
    #             print(context)
    print(context)
    return render(request, 'reviews/review_index.html', context)
