
# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from movies.models import Movie

class UserMovie(models.Model):
    # for status
    STATUS_CHOICES = [
        ('watched', 'Watched'),
        ('watching', 'Watching'),
        ('want_to_watch', 'Want to Watch'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_movies')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='user_movies')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='want_to_watch')
    rating = models.IntegerField(null=True, blank=True)  # 1–5 stars
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'movie')  # one entry per user per movie

    def __str__(self):
        return f"{self.user.username} → {self.movie.title} [{self.status}]"