from django.utils.translation import gettext_lazy as _
from django.forms import ModelForm, Textarea, ChoiceField, Select
from reviews.models import Review

# Create the form class.
class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['title', 'grade', 'text']

        CHOICES = []
        for i in range(1,11):
            CHOICES.append((f"{i}",i))


        widgets = {
            'text': Textarea(attrs={'cols': 80, 'rows': 20}),
            'grade':    Select(choices=CHOICES)
        }
        labels = {
            'text': _('Review'),
        }
