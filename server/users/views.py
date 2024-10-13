from rest_framework import viewsets
from .models import User, Role
from .serializers import UserSerializer, RoleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class UserStatistics(APIView):
    permission_classes = [AllowAny]
    def get(self, request):

        users = User.objects.all()
        count = users.count()

        users_serializer = UserSerializer(users, many=True)

        data = {
            "count": count,
            "users": users_serializer.data
        }

        return Response(data)