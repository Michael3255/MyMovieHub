from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('movies/', include('movies.urls')),
    path('user-movies/', include('user_movies.urls')),
    path('auth/', include('auth_api.urls')),
]