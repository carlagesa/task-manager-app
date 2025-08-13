from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Task

class TaskAPITests(APITestCase):
    """Tests for the Task API endpoints."""

    def test_create_task(self):
        """Ensure we can create a new task object."""
        url = reverse('task-list-create')
        data = {'title': 'A New Test Task'}
        # Make a POST request to the endpoint with the task data
        response = self.client.post(url, data, format='json')
        # Asserts that the request was successful (HTTP 201 Created)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Asserts that a task was actually created in the database
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'A New Test Task')

    def test_list_tasks(self):
        """Ensure we can list all task objects."""
        # Create a sample task to be listed
        Task.objects.create(title="Sample Task 1", description="A description")
        url = reverse('task-list-create')
        # Make a GET request to the endpoint
        response = self.client.get(url, format='json')
        # Assert that the request was successful (HTTP 200 OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Assert that the response contains the task we created
        self.assertEqual(len(response.data['results']), 1) # 'results' because of pagination