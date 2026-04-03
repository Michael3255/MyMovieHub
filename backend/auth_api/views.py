from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password:
        return Response({'error': 'Username and password are required.'})

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken.'})

    user = User.objects.create_user(username=username, password=password, email=email)

    token = Token.objects.create(user=user)

    return Response({
        'token': token.key,
        'username': user.username
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid username or password.'})

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'username': user.username
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logged out successfully.'})