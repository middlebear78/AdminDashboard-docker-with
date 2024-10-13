from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RoleViewSet, UserStatistics
from django.urls import path

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'roles', RoleViewSet)

urlpatterns = router.urls + [
    path("statistics/users/", UserStatistics.as_view(), name="user statistics")
]
