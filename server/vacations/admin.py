from django.contrib import admin
from .models import Vacation, Country, Like


@admin.register(Vacation)
class VacationAdmin(admin.ModelAdmin):
    list_display = ('vacation_id', 'vacation_name', 'price',
                    'start_date', 'end_date', 'country', 'likes')
    search_fields = ('vacation_name', 'country__country_name')
    list_filter = ('country', 'start_date')


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('country_id', 'country_name')


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'vacation_id')
