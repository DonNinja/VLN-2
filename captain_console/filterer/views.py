from django.shortcuts import render
from filterer.models import Category
from django.http import JsonResponse

# Create your views here.

def get_json_categories(request):
    """returns json response for all categories"""
    categories = Category.objects.all()         # get all categories
    cat_list = [i.name for i in categories]     # get all names
    return JsonResponse({"data": cat_list})     # return json