from rest_framework import serializers
from .models import UserMovie

class UserMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMovie
        fields = '__all__'