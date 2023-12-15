from rest_framework import serializers

from contact.models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone_number']

    def validate_phone_number(self,value: str):
        # Check if they are not characters in the phone number if there are characters raise an error but + can be
        # allowed
        original = value

        if not value.replace('+', '').replace(" ", '').isdigit():
            raise serializers.ValidationError('phone number must be a number')
        return original


class ContactCreateListSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(many=True)

    class Meta:
        model = Contact
        fields = ['contacts']

    def create(self, validated_data):
        contacts_data = validated_data.pop('contacts')
        user = self.context.get('request').user
        contacts = []
        for contact_data in contacts_data:
            # check if the contact already exists
            contact = Contact.objects.filter(user=user, phone_number=contact_data.get('phone_number')).first()
            if contact:
                continue
            contact = Contact.objects.create(user=user, **contact_data)
            contacts.append(contact)
        return contacts


class CheckContactSerializer(serializers.Serializer):
    contacts = serializers.ListField(child=serializers.CharField(max_length=255))

    def validate(self, attrs):
        contacts = attrs.get('contacts')
        if not contacts:
            raise serializers.ValidationError('contacts is required')
        return attrs
