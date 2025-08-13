# tasks/urls.py
from django.urls import path
from .views import TaskListCreateAPIView, TaskRetrieveUpdateDestroyAPIView

urlpatterns = [
    # /api/tasks/ -> GET (List), POST (Create)
    path('', TaskListCreateAPIView.as_view(), name='task-list-create'),
    # /api/tasks/<id>/ -> GET (Retrieve), PUT/PATCH (Update), DELETE (Destroy)
    path('<int:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='task-detail'),
]