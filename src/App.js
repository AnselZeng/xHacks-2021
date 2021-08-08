import React, { Component } from "react";
import { generateSudoku, checkSolution } from "./lib/sudoku";
import produce from "immer";
import SudokuBoard from "./components/SudokuBoard";
import "./App.css";
import generator from "sudoku";
import Pad from "./components/Pad";

window.generator = generator;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
        if (!state.sudoku.solvedTime) {
          const solved = checkSolution(state.sudoku);
          if (solved) {
            state.sudoku.solveTime = new Date();
          }
        }
      })
    );
  };

  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row =>
          row.cols.forEach(col => {
            col.value = state.sudoku.solution[col.row * 9 + col.col];
          })
        );
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku</h1>
        </header>
        <Pad/>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
        <button class="button1" onClick={this.solveSudoku}>Solve Puzzle</button>
        <footer>Made by Ansel and Teddy.<br/>Copyright © 2021. All rights reserved.</footer>
      </div>
    );
  }
}

export default App;
