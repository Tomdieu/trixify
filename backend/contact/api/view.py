from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework import response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from rest_framework.decorators import action

from contact.api.serializers import CheckContactSerializer, ContactSerializer, ContactCreateListSerializer

from django.contrib.auth import get_user_model
from accounts.api.serializers import UserMinimalSerializer

User = get_user_model()


class ContactViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = ContactSerializer

    def get_serializer_class(self):
        if self.action == 'create_list':
            return ContactCreateListSerializer
        return ContactSerializer

    def get_queryset(self):
        return self.request.user.contacts.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=False)
    def create_list(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        return response.Response(serializer.data)


class CheckContactViewSet(CreateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = CheckContactSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        contacts = serializer.validated_data.get('contacts')

        # Here we are going to check if the contacts are registered on the platform

        results = []

        for contact in contacts:
            user = User.objects.filter(phone_number=contact).first()
            found = False
            if user:
                found = True
            results.append({'user': UserMinimalSerializer(user, context={'request': request}).data, 'contact': contact,
                            'found': found})

        # contacts = User.objects.filter(phone_number__in=contacts)

        return response.Response({"contacts": results})
