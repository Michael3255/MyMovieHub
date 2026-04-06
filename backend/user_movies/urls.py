from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_user_movies, name='get-user-movies'),
    path('add/', views.add_user_movie, name='add-user-movie'),
    path('<int:pk>/', views.get_user_movie, name='get-user-movie'),
    path('<int:pk>/update/', views.update_user_movie, name='update-user-movie'),
    path('<int:pk>/delete/', views.delete_user_movie, name='delete-user-movie'),
]