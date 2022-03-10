from django.urls import path

from . import views

urlpatterns = [
    path('binary_plot', views.make_binary_plot),
    path('create_cellular_automaton', views.create_cellular_automaton),
    path('get_all_cellular_automata', views.get_all_cellular_automata),
    path('delete_cellular_automaton/<int:automata_id>', views.delete_cellular_automaton),
]