from django import forms

class SlackForm(forms.Form):
    email = forms.EmailField(label='Your email')
