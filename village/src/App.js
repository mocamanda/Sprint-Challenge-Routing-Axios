import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };

    this.getSmurfs = this.getSmurfs.bind(this);
  }

  getSmurfs () {
    axios.get("http://localhost:3333/smurfs")
      .then(response => {
        console.log(response.data);
        this.setState({ smurfs: response.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteSmurf = id => {
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        this.getSmurfs();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getSmurfs();
  }

  // add any needed code to ensure that the smurfs collection exists
  // on state and it has data coming from the server
  // Notice what your map function is looping over and returning
  // inside of Smurfs.
  // You'll need to make sure you have the right properties on state
  // and pass them down to props.
  render() {
    return (
      <div className="App">
        <SmurfForm
          get={this.getSmurfs}
          submit={this.addSmurf} id={-1}
        />
        <Smurfs
          smurfs={this.state.smurfs}
          get={this.getSmurfs}
        />
      </div>
    );
  }
}

export default App;