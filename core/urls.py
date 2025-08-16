from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    # API routes
    path('api/tasks/', include('tasks.urls')),
    # Serve React App
    path('', TemplateView.as_view(template_name='index.html')),
]
