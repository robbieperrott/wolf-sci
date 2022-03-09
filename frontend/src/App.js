import './App.css';
import { Home } from './home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Automata } from './automata/Automata';
import { GenerateAutomaton } from './automata/GenerateAutomaton/GenerateAutomaton';
import { ViewAutomata } from './automata/ViewAutomata/ViewAutomata';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='automata' element={<Automata />}>
          <Route path='generate' element={<GenerateAutomaton />} />
          <Route path='view' element={<ViewAutomata />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
