from collections import defaultdict
from rest_framework import viewsets
from .models import Vacation, Country, Like
from .serializers import VacationSerializer, CountrySerializer, LikeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from rest_framework.permissions import AllowAny


class VacationViewSet(viewsets.ModelViewSet):
    queryset = Vacation.objects.all()
    serializer_class = VacationSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class VacationStatistics(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        current_date = now()

        past_due_vacations = Vacation.objects.filter(end_date__lt=current_date)
        ongoing_vacations = Vacation.objects.filter(
            start_date__lte=current_date, end_date__gte=current_date)
        future_vacations = Vacation.objects.filter(
            start_date__gte=current_date)

        past_due_serializer = VacationSerializer(past_due_vacations, many=True)
        ongoing_serializer = VacationSerializer(ongoing_vacations, many=True)
        future_serializer = VacationSerializer(future_vacations, many=True)

        data = {
            'past_due': {
                'count': past_due_vacations.count(),
                'vacations': past_due_serializer.data
            },
            'ongoing': {
                'count': ongoing_vacations.count(),
                'vacations': ongoing_serializer.data
            },
            'future': {
                'count': future_vacations.count(),
                'vacations': future_serializer.data
            }
        }

        return Response(data)


class LikesStatistics(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        likes_by_country = self.get_likes_by_country()
        return Response(likes_by_country)

    def get_likes_by_country(self):
        vacations = Vacation.objects.all()
        likes_count = defaultdict(int)

        for vacation in vacations:
            likes_count[vacation.country_id] += vacation.likes

        data = []
        for country_id, likes in likes_count.items():
            try:
                country = Country.objects.get(country_id=country_id)
                data.append({
                    'country': country.country_name,
                    'likes': likes
                })
            except Country.DoesNotExist:
                continue

        return {
            "likes_by country": data}
