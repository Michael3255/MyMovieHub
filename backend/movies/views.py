
# Create your views here.
import os
import requests # to pull third party apis
from rest_framework.decorators import api_view
from rest_framework.response import Response

# I definitely used AI here because I wasn't sure where to start with the tMDB api

@api_view(['GET'])
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