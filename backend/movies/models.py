
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255)
    release_year = models.IntegerField(null=True, blank=True)
    genres = models.JSONField(default=list)
    poster_url = models.URLField(max_length=500, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tmdb_id = models.IntegerField(unique=True, null=True, blank=True)  # for the tmdb api

    def __str__(self):
        return f"{self.title} ({self.release_year})"