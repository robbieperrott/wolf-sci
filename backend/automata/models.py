from django.db import models
from django.contrib.postgres.fields import ArrayField

class CellularAutomaton(models.Model):
  rule = models.PositiveIntegerField(default=30)
  steps = models.PositiveIntegerField(default=100)
  binary_plot = ArrayField(ArrayField(models.IntegerField()))
  date_time = models.DateTimeField(default=None)

  class Meta:
    unique_together = ['rule', 'steps']

  def __str__(self):
    return f'Rule {str(self.rule)} ({str(self.steps)} steps)'

