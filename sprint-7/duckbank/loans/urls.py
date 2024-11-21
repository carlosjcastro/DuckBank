from django.urls import path
from . import views

urlpatterns = [
    path('apply/', views.loan_application_view, name='loan_application'),
    path('apply/result/<int:loan_id>/', views.loan_application_result, name='loan_application_result'),
    path('history/', views.loan_history, name='loan_history'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('show_client_data/', views.show_client_data, name='show_client_data'),
    path('list_cards/', views.list_cards, name='list_cards'),
    path('registro/', views.registro, name='registro'),
    path('', views.login_view, name='login'),
    path('list_accounts/', views.list_accounts, name='list_accounts'),
]
