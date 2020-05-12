from django.shortcuts import render
from filterer.models import Category
from django.http import JsonResponse

# Create your views here.

def get_json_categories(request):
    categories = Category.objects.all()
    cat_list = [i.name for i in categories]
    return JsonResponse({"data": cat_list})