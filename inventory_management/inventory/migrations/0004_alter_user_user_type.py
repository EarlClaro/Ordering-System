# Generated by Django 5.0.1 on 2024-12-23 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_alter_user_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(default='employee', max_length=120),
        ),
    ]
