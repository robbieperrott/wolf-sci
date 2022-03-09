## Wolf-Sci

This repository contains an application that generates elementary cellular automata, based on some of the work of the scientist Stephen Wolfram. You can learn more about elementary cellular automata here: https://mathworld.wolfram.com/ElementaryCellularAutomaton.html

### Running the application

I have dockerised the entire application. To run it, install docker, `cd` to the `wolf-sci` directory and enter

`docker-compose up`

This will build a postgres database, the Django backend, and the React front end. Note that this may take some time. You may also have to increase the memory in your docker settings, which can be in the Docker.app Settings > Resources.