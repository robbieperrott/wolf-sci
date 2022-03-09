from django.urls import path

from . import views

urlpatterns = [
    path('binary_plot', views.MakeBinaryPlot),
    path('create_cellular_automaton', views.CreateCellularAutomaton),
    path('get_all_cellular_automata', views.GetAllCellularAutomata),
    path('delete_cellular_automaton/<int:automata_id>', views.DeleteCellularAutomaton),
]