from django.contrib import admin
from django.urls import path
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Routes all requests starting with 'api/tasks/' to our tasks app
    path('api/tasks/', include('tasks.urls')),
]
