from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.views import LoginView
from loans.urls import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('loans/', include('loans.urls')),
    path('', LoginView.as_view(template_name='loans/login.html'), name='login'),
    path('api/', include(router.urls)),
]
