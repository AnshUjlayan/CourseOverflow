# Generated by Django 4.2.6 on 2023-11-13 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_playlist_cloudinarypublicid_user_cloudinarypublicid_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='bundleSize',
        ),
        migrations.AddField(
            model_name='playlist',
            name='isDraft',
            field=models.BooleanField(default=True),
        ),
    ]
