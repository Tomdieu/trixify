"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "Trixify Admin"
admin.site.site_title = "Trixify Admin"
admin.site.index_title = "Trixify Administration"
admin.empty_value_display = "**Empty**"

schema_view = get_schema_view(
    openapi.Info(
        title="Trixify",
        default_version="v0.0.1",
        description="Trixify Api Docs",
        contact=openapi.Contact(
            email="ivantomdio@gmail.com",
            name="ivantom",
            url="https://github.com/tomdieu",
        ),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^_nested_admin/", include("nested_admin.urls")),
    
    # path("auth/", include("drf_social_oauth2.urls", namespace="drf")),
    path('o/', include('oauth2_provider.urls', namespace="oauth2_provider")),
    #
    #
    path("api/", include("accounts.urls", namespace="accounts")),
    path("api/", include("chats.urls", namespace="chats")),
    path("api/docs/", schema_view.with_ui("swagger", cache_timeout=0),
         name="schema-swagger-ui", ),
    re_path(r"^api/docs/redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc", ),
    # path(
    #     "api/",
    #     include(
    #         [
    #             # path("accounts/", include("accounts.urls")),
    #             path("chats/", include("chats.api.urls")),
    #             path(
    #                 "docs/",
    #                 include(
    #                     [
    #                         re_path(
    #                             r"^swagger(?P<format>\.json|\.yaml)$",
    #                             schema_view.without_ui(cache_timeout=0),
    #                             name="schema-json",
    #                         ),
    #                         re_path(
    #                             r"^swagger/$",
    #                             schema_view.with_ui("swagger", cache_timeout=0),
    #                             name="schema-swagger-ui",
    #                         ),
    #                         re_path(
    #                             r"^redoc/$",
    #                             schema_view.with_ui("redoc", cache_timeout=0),
    #                             name="schema-redoc",
    #                         ),
    #                     ]
    #                 ),
    #             ),
    #         ]
    #     ),
    # ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
