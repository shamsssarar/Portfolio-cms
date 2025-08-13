from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Project, Skill, Post, ContactMessage
from rest_framework import viewsets, permissions, status
from .serializers import ProjectSerializer, SkillSerializer, PostSerializer, ContactMessageSerializer
# Create your views here.

@api_view(['GET'])
def ping(request):
    return Response({"ok": True, "message": "API is live"})

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.order_by("-created_at")
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.order_by("name")
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()  # ordering in Meta
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"ok": True, "message": "Thanks! I’ll get back to you."}, status=status.HTTP_201_CREATED)
    return Response({"ok": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)