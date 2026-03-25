from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User

# Model for movies from tmdb Database
class Movie(models.Model):
    title = models.CharField(max_length=255)
    release_year = models.IntegerField()
    genres = models.CharField(max_length=255)
    poster_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

# Model for the movies selected by the user
class UserMovie(models.Model):
    STATUS_CHOICES = [
        ('watched', 'Watched'),
        ('watching', 'Watching'),
        ('want_to_watch', 'Want to Watch'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    rating = models.IntegerField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)