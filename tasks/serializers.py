# tasks/serializers.py
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    """Serializer for the Task model."""
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'is_completed', 'created_at']