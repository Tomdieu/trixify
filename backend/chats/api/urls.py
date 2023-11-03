from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"chats", views.ChatViewSet)
router.register(r"messages", views.MessageViewSet)
router.register(r"seens", views.SeenViewSet)
router.register(r"conversations", views.ConversationViewSet)
router.register(r"group-conversations", views.GroupConversationViewSet)
router.register(r"group-members", views.GroupMemberViewSet)


urlpatterns = router.urls
