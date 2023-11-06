from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"chats", views.ChatViewSet)
router.register(r"messages", views.MessageViewSet)
# router.register(r"seen-by", views.SeenViewSet)
router.register(r"conversations", views.ConversationViewSet)
router.register(r"groups", views.GroupConversationViewSet)
# router.register(r"group-members", views.GroupMemberViewSet)
router.register("message-reactions",views.MessageReactionViewSet,basename="message-reactions")


urlpatterns = router.urls
