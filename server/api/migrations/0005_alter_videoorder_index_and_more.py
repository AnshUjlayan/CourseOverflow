# Generated by Django 4.2.6 on 2023-11-09 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_comment_commentid_alter_comment_dislikes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videoorder',
            name='index',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterUniqueTogether(
            name='playlistinteraction',
            unique_together={('userId', 'playlistId')},
        ),
    ]
