from rest_framework import serializers
from .models import UserMovie
from movies.serializers import MovieSerializer

class UserMovieSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)

    class Meta:
        model = UserMovie
        fields = '__all__'