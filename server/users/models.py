from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=45, blank=True, null=True)

    def __str__(self):
        return self.role_name or "no role assigned"

    class Meta:
        managed = False
        db_table = 'roles'


class User(AbstractUser):
    firebase_uid = models.CharField(max_length=255, unique=True, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)

    class Meta:
        managed = True
        db_table = 'users'
        # Set unique related names to avoid clashes
        permissions = [
            ('can_view_users', 'Can view users'),
            # Add other permissions as needed
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role or 'No Role'}"

    # Override the default groups and user_permissions fields
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",  # Unique related name
        blank=True,
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions_set",  # Unique related name
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )