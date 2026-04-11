
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserMovie
from .serializers import UserMovieSerializer
from movies.models import Movie

#CRUD

# Returns all movies in the logged in user's list
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_movies(request):
    user_movies = UserMovie.objects.filter(user=request.user)
    serializer = UserMovieSerializer(user_movies, many=True)
    return Response(serializer.data)

# Adds a new movie to the logged in user's list
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_user_movie(request):
    movie_id = request.data.get('movie_id')
    status = request.data.get('status', 'want_to_watch')
    rating = request.data.get('rating')
    notes = request.data.get('notes', '')

    movie = Movie.objects.get(id=movie_id)

    user_movie = UserMovie.objects.create(
        user=request.user,
        movie=movie,
        status=status,
        rating=rating,
        notes=notes
    )

    serializer = UserMovieSerializer(user_movie)
    return Response(serializer.data)

# Updates the status, rating, and notes of an existing movie record
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_movie(request, pk):
    user_movie = UserMovie.objects.get(id=pk, user=request.user)

    user_movie.status = request.data.get('status', user_movie.status)
    user_movie.rating = request.data.get('rating', user_movie.rating)
    user_movie.notes = request.data.get('notes', user_movie.notes)

    user_movie.save()

    serializer = UserMovieSerializer(user_movie)
    return Response(serializer.data)

# Removes a movie from the logged in user's list
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_movie(request, pk):
    user_movie = UserMovie.objects.get(id=pk, user=request.user)
    user_movie.delete()
    return Response({'message': 'Deleted successfully.'})

# Returns the details of a single UserMovie record
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_movie(request, pk):
    user_movie = UserMovie.objects.get(id=pk, user=request.user)
    serializer = UserMovieSerializer(user_movie)
    return Response(serializer.data)