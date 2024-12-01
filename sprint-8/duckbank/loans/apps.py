from django.apps import AppConfig


class LoansConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'loans'

class LoansConfig(AppConfig):
    name = 'loans'

    def ready(self):
        import loans.signals
