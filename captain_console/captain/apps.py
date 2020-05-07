from django.apps import AppConfig
from filterer.apps import FiltererConfig
from cart.apps import CartConfig
from account.apps import AccountConfig
from histories.apps import HistoriesConfig
from manufacturer.apps import ManufacturerConfig
from product.apps import ProductConfig


class CaptainConfig(AppConfig):
    name = 'captain'

# class AccountConfig(AppConfig):
#     name = 'account'

# class HistoriesConfig(AppConfig):
#     name = 'histories'

# class ManufacturerConfig(AppConfig):
#     name = 'manufacturer'

# class ProductConfig(AppConfig):
#     name = 'product'



# TODO: MAKE FILTER APP