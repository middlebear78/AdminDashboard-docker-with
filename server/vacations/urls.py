from rest_framework.routers import DefaultRouter
from .views import VacationViewSet, CountryViewSet, LikeViewSet

router = DefaultRouter()
router.register(r'vacations', VacationViewSet)
router.register(r'countries', CountryViewSet)
router.register(r'likes', LikeViewSet)

urlpatterns = router.urls
