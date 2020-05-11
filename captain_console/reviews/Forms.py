from django.utils.translation import gettext_lazy as _
from django.forms import ModelForm, Textarea
from reviews.models import Review

# Create the form class.
class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['title', 'grade', 'text']

        widgets = {
            'text': Textarea(attrs={'cols': 80, 'rows': 20}),
        }
        labels = {
            'text': _('Review'),
        }
