from django.contrib import admin
from .models import CarMake, CarModel


# CarModelInline class for editing car models within the car make admin
class CarModelInline(admin.TabularInline):
    model = CarModel
    extra = 1


# CarMakeAdmin class with CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'founded_year')
    search_fields = ('name',)
    inlines = [CarModelInline]


# CarModelAdmin class
class CarModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'car_make', 'car_type', 'year', 'dealer_id')
    list_filter = ('car_type', 'year', 'car_make')
    search_fields = ('name', 'car_make__name')


# Register models here
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
