import os
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer


# Calls the TMDB API with a search query and returns a formatted list of movies
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_movies(request):

    query = request.query_params.get('query', '')

    if not query:
        return Response({'error': 'Please provide a search query.'})

    api_key = os.getenv('TMDB_API_KEY')

    url = 'https://api.themoviedb.org/3/search/movie'

    params = {
        'api_key': api_key,
        'query': query,
        'language': 'en-US',
        'page': 1
    }

    tmdb_response = requests.get(url, params=params)
    data = tmdb_response.json()

    results = []

    for item in data.get('results', []):

        poster_path = item.get('poster_path')
        if poster_path:
            poster_url = 'https://image.tmdb.org/t/p/w500' + poster_path
        else:
            poster_url = None

        release_date = item.get('release_date', '')
        if release_date:
            release_year = release_date[:4]
        else:
            release_year = None

        movie = {
            'tmdb_id': item.get('id'),
            'title': item.get('title'),
            'release_year': release_year,
            'description': item.get('overview'),
            'poster_url': poster_url,
            'genres': item.get('genre_ids', []),
        }

        results.append(movie)

    return Response({'results': results})


# Saves a movie from TMDB into our database
# If the movie already exists, returns it instead of creating a duplicate
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_movie(request):

    tmdb_id = request.data.get('tmdb_id')
    title = request.data.get('title')
    release_year = request.data.get('release_year')
    description = request.data.get('description')
    poster_url = request.data.get('poster_url')
    genres = request.data.get('genres', [])

    existing_movie = Movie.objects.filter(tmdb_id=tmdb_id).first()

    if existing_movie:
        serializer = MovieSerializer(existing_movie)
        return Response(serializer.data)

    movie = Movie.objects.create(
        tmdb_id=tmdb_id,
        title=title,
        release_year=release_year,
        description=description,
        poster_url=poster_url,
        genres=genres,
    )

    serializer = MovieSerializer(movie)
    return Response(serializer.data)

# Fetches the YouTube trailer key for a movie from TMDB
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_trailer(request, tmdb_id):
    api_key = os.getenv('TMDB_API_KEY')
    url = 'https://api.themoviedb.org/3/movie/' + str(tmdb_id) + '/videos'
    params = {'api_key': api_key, 'language': 'en-US'}

    tmdb_response = requests.get(url, params=params)
    data = tmdb_response.json()

    # Find the first YouTube trailer in the results
    for video in data.get('results', []):
        if video.get('site') == 'YouTube' and video.get('type') == 'Trailer':
            return Response({'youtube_key': video.get('key')})

    return Response({'youtube_key': None})


# Gets movie recommendations from TasteDive based on the user's highest rated movie
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):

    from user_movies.models import UserMovie

    # Get the user's highest rated watched movie
    user_movies = UserMovie.objects.filter(
        user=request.user,
        status='watched'
    ).order_by('-rating')

    if not user_movies:
        return Response({'error': 'You need to have watched and rated at least one movie to get recommendations.'})

    top_movie = user_movies[0]
    movie_title = top_movie.movie.title

    # Call the TasteDive API with that movie title
    api_key = os.getenv('TASTEDIVE_API_KEY')

    url = 'https://tastedive.com/api/similar'

    params = {
        'q': movie_title,
        'type': 'movie',
        'limit': 5,
        'k': api_key,
    }

    tastedive_response = requests.get(url, params=params)
    data = tastedive_response.json()

    # Format the results and send them back
    recommendations = []

    for item in data.get('similar', {}).get('results', []):
        recommendations.append({
            'title': item.get('name'),
            'type': item.get('type'),
        })

    return Response({
        'based_on': movie_title,
        'recommendations': recommendations,
    })