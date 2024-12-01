from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('loans/', include('loans.urls')),
    path('', LoginView.as_view(template_name='loans/login.html'), name='login'),
]
