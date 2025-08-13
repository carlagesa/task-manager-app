# tasks/views.py
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend # Imports the filter backend
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_completed'] # Specifies which fields can be filtered

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer