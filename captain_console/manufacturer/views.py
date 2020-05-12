from django.shortcuts import render, get_object_or_404
from manufacturer.models import Manufacturer
from django.http import JsonResponse

# Create your views here.

def index(request):
    context = {'manufacturer': Manufacturer.objects.all()}
    return render(request, 'manufacturer/index.html', context)

def get_manufacturer_by_id(request, id):
    return render(request, 'manufacturer/manufacturer_details.html', {
        'manufacturer': get_object_or_404(Manufacturer, pk=id)
})

def get_json_manufacturer(request):
    companies = Manufacturer.objects.all()
    companies_list = [i.name for i in companies]
    return JsonResponse({"data": companies_list})