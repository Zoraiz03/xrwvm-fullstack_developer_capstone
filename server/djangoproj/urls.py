from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Admin panel
    path('admin/', admin.site.urls),

    # API endpoints from your app
    path('djangoapp/', include('djangoapp.urls')),

    # Catch-all for React routes (login, register, dashboard, etc.)
    re_path(r'^(?!admin|djangoapp|static|media).*$', TemplateView.as_view(template_name='index.html')),
]

# Serve static & media files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)