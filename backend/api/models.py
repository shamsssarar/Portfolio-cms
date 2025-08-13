from django.db import models

# Create your models here.
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    tech = models.CharField(max_length=200, blank=True)   # e.g. "Django, React, Tailwind"
    link = models.URLField(blank=True)                    # live/demo link
    image_url = models.URLField(blank=True)               # keep simple (no file upload yet)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=60, unique=True)
    level = models.PositiveSmallIntegerField(default=70)   # 0–100 bar for UI

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True)
    body = models.TextField()
    published_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"
