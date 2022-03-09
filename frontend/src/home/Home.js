import { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
    return(
      <div className='Home'>
        <div className='center'>
          <h2>Welcome to</h2>
          <Link to='/automata/generate'>
            <h1><i className='special'>WolfSci</i></h1>
          </Link>
          <h3>Elementary Cellular Automata</h3>
          <p>Robbie Perott 2022</p>
        </div>
      </div>
    );
  }
}