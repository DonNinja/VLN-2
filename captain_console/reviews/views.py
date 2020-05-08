from django.shortcuts import render, get_object_or_404
from reviews.models import Review

# Create your views here.

def review_index(request):
    context = {'reviews': Review.objects.all()}
    return render(request, 'reviews/review_index.html', context)

def get_review_by_id(request, id):
    return render(request, 'reviews/review_details.html', {
        'reviews': get_object_or_404(Review, pk=id)
})