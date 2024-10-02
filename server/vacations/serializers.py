from rest_framework import serializers
from .models import Vacation, Country, Like


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['country_id', 'country_name']


class VacationSerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = Vacation
        fields = [
            'vacation_id', 'vacation_name', 'vacation_description', 'start_date',
            'end_date', 'price', 'vacation_img', 'country', 'likes', 'vacation_days'
        ]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'vacation']
