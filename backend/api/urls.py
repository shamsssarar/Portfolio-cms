from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ping, ProjectViewSet, SkillViewSet, PostViewSet, contact

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"posts", PostViewSet, basename="post")


urlpatterns = [
    path("ping/", ping, name="ping"),
    path("contact/", contact, name="contact"),
    path("", include(router.urls)),
]
