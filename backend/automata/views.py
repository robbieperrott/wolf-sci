from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from automata.serializers import CellularAutomatonSerializer
from .utils import generate_binary_plot
from .models import CellularAutomaton
import json
from rest_framework.renderers import JSONRenderer
from rest_framework import status


def MakeBinaryPlot(request):
  rule = int(request.GET.get('rule'))
  steps = int(request.GET.get('steps'))
  binary_plot = generate_binary_plot(rule, steps)

  return HttpResponse([binary_plot])

@csrf_exempt
def CreateCellularAutomaton(request):
  data = json.loads(request.body)

  rule = data['rule']
  steps = data['steps']
  binary_plot = data['binary_plot']
  date_time = timezone.now()

  CellularAutomaton.objects.create(
    rule=rule,
    steps=steps,
    binary_plot=binary_plot,
    date_time=date_time
  )

  return HttpResponse('Successfully created a cellular automaton')

def GetAllCellularAutomata(request):
  c = CellularAutomaton.objects.all()
  serializer = CellularAutomatonSerializer(c, many=True)
  json = JSONRenderer().render(serializer.data)
  return HttpResponse(json)

@csrf_exempt
def DeleteCellularAutomaton(request, automata_id):
  try:
    automaton = CellularAutomaton.objects.get(id=automata_id)
  except CellularAutomaton.DoesNotExist:
    return HttpResponse(status=status.HTTP_404_NOT_FOUND)
  
  automaton.delete()
  return HttpResponse(status=status.HTTP_204_NO_CONTENT)

