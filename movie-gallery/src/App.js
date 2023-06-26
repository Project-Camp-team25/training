import React, { Component } from "react";
import "./App.css";
import MovieIntroductions from "./component/MovieIntroductions";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Movie Gallery</h1>
        <MovieIntroductions />
      </div>
    );
  }
}

export default App;
