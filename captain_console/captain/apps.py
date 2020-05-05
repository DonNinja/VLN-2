from django.apps import AppConfig
from filterer.apps import FiltererConfig


class CaptainConfig(AppConfig):
    name = 'captain'

class AccountConfig(AppConfig):
    name = 'account'

class HistoriesConfig(AppConfig):
    name = 'histories'

class ManufacturerConfig(AppConfig):
    name = 'manufacturer'

class ProductConfig(AppConfig):
    name = 'product'



# TODO: MAKE FILTER APP