# Generated by Django 3.1.2 on 2022-03-07 20:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('automata', '0008_cellularautomaton_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cellularautomaton',
            name='date',
        ),
    ]