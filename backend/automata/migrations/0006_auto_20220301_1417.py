# Generated by Django 3.1.2 on 2022-03-01 14:17

import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('automata', '0005_auto_20220301_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cellularautomaton',
            name='binary_plot',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(1)]), size=None), size=None),
        ),
    ]
