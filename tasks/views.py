# tasks/views.py
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

# This view handles listing all tasks and creating a new task
class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# This view handles retrieving, updating, and deleting a single task by its ID
class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer