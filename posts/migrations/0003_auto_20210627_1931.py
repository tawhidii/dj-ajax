# Generated by Django 3.0 on 2021-06-27 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20210627_1930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]