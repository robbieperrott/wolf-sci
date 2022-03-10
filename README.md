## Wolf-Sci

This repository contains an application that generates elementary cellular automata, based on some of the work of the scientist Stephen Wolfram. You can learn more about elementary cellular automata here: https://mathworld.wolfram.com/ElementaryCellularAutomaton.html

### Running the application

I have dockerised the entire application. To run it, install docker, `cd` to the `wolf-sci` directory and enter

`docker-compose up`

This will build a postgres database, the Django backend, and the React front end. Note that this may take some time. You may also have to increase the memory in your docker settings, which can be in the Docker.app Settings > Resources.

The front end will be available at `localhost:3000` and the backend api will be available at `localhost:8000`.

### Functionality

The basic functionality can be seen in the `demo.mp4` video in this folder.

The application front end features a start screen, and two pages, 'Generate' and 'My Automata'.

#### 1. Generate

The generate page allows the user to create an elementary cellular automata by entering the rule to use, and the number of steps the cellular automata generating algorithm must run for. Rules must be between 0 and 256. I have limited the number of steps to 1000, as anything above that is computationally expensive and time consuming. The input boxes are constrained accordingly.

Clicking 'Go' calls `make_binary_plot` (in `backend/automata/views.py`) on the backend, which returns a nested array of 0s and 1s, which represents the elementary cellular automaton (I refer to these arrays in the code as a "binary plot"). This data is then plotted using plotly.js and displayed.

If the user wants to save the automaton, they can click the save button, or they can close and return to the rule / step selection. After the user clicks save, they will either get a notification saying that the automaton was saved succesfully, or that it already exists in their saved automata.

Saving happens on the backend via `create_cellular_automaton` (in `backend/automata/views.py`), which attempts to create a new CellularAutomaton object from the given rule, steps, and binary plot. Note that in the model definition of CellularAutomaton in backend/automata/models.py we have the following code:

`class Meta:`
`    unique_together = ['rule', 'steps']`

Which means that if a user tries to create an automaton with the same rule and steps as an existing automaton, an error will be thrown.

When a new cellular automaton is created in the backend, the date-time of the creation is stored in a date_time field.

#### 2. My Automata

This displays all the users saved automata in a grid. Clicking on an automaton will open a modal displaying the automaton, with its number of rules and steps, and the date / time it was created. Clicking 'OK' will return back to the grid display. Clicking 'Delete' will remove the automata. The saved automata are fetched using `get_all_cellular_automata`, and deletion happens using `delete_cellular_automaton`. Both are located in `backend/automata/views.py`.

If the grid grows to beyond the height of the page, scrolling will be enabled.

If there are no saved automata, an empty data page will be displayed instead of the grid.
