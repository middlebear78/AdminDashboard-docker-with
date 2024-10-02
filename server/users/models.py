from django.db import models


class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=45, blank=True, null=True)

    def __str__(self):
        return self.role_name or "no role assigned"

    class Meta:
        managed = False
        db_table = 'roles'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=45, blank=True, null=True)
    last_name = models.CharField(max_length=45, blank=True, null=True)
    email = models.EmailField(
        max_length=45, blank=True, null=True, unique=True)
    password = models.CharField(max_length=512, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)

    class Meta:
        managed = False
        db_table = 'users'
