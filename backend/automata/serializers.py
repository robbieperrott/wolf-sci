from rest_framework import serializers
from .models import CellularAutomaton

class CellularAutomatonSerializer(serializers.ModelSerializer):
  class Meta:
    model = CellularAutomaton
    fields = ('id', 'rule', 'steps', 'binary_plot', 'date_time')