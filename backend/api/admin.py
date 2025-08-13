from django.contrib import admin
from .models import Project, Skill, Post, ContactMessage
# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "tech", "link", "created_at")
    search_fields = ("title", "tech")

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "level")
    search_fields = ("name",)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "published_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title",) 

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at",)
