from django.db import models

class Task(models.Model):
    """Represents a single task in the to-do list."""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True) # blank=True for admin, null=True for db
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title 