from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_movies, name='movie-search'),
    path('save/', views.save_movie, name='movie-save'),
    path('recommendations/', views.get_recommendations, name='recommendations'),
    path('<int:tmdb_id>/trailer/', views.get_trailer, name='movie-trailer'),
]