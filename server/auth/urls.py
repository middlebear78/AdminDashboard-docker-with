from django.urls import path
from . import views
urlpatterns = [
    path('verify_firebase_token/', views.verify_firebase_token,
         name='verify_firebase_token')
]
