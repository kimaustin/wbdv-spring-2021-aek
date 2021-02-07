import React, { useState } from 'react';
import './App.css';
import 'milligram';


function App() {
  // using sets for answers since the sets cannot contain dups
  const [answer, setAnswer] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState("");
  const [bulls, setBulls] = useState(0);
  const [cows, setCows] = useState(0);
  const [wonMsg, setWonMsg] = useState("");


  function newGame() {
    // setAnswer(new Set([]));
    var tempAnswer = new Set([]);
    while (tempAnswer.size < 4) {
      const rand = Math.floor(Math.random() * 9);
      tempAnswer.add(Math.floor(Math.random() * 9));
    }
    // console.log("Answer: ", tempAnswer);
    setAnswer(Array.from(tempAnswer));
    setWonMsg("");
  }

  // taken from stack overflow: 
  // https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
  function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  function updateGuess(aGuess) {
    let guessN = aGuess.target.value;
    var guessAsArray = Array.from(guessN);
    if (!hasDuplicates(guessAsArray) && !isNaN(guessN)) {
      setGuess(guessN);
      // console.log("building on guess: ", guessN);
    }
  }

  function submitGuess() {
    var curGuesses = Array.from(guesses);
    // console.log("curGuesses: ", curGuesses);

    if (guess.length == 4) {

      console.log("guess to be added: ", guess);
      checkGuess(Array.from(guess.toString()).map(Number));

      // var guessObj = {
      //   guess:[Array.from(guess.toString()).map(Number)], bulls:bulls, cows:cows
      // };

      curGuesses.unshift(Array.from(guess.toString()).map(Number));
      var guessesBC = Array(curGuesses);
      guessesBC.push(Array.from(bulls));
      guessesBC.push(Array.from(cows));

      console.log("updated guesses: ", guessesBC);
      setGuesses(guessesBC);
    }
    setGuess("");
  }

  function keyPress(event) {
    if (event.key == "Enter") {
      submitGuess();
    }
  }

  // guessN: Array
  function checkGuess(guessN) {
    // var guessN = Array.from(guess);
    // console.log("guess is: ", guessN);
    // console.log("answer is: ", answer);
    var bullsTemp = 0;
    var cowsTemp = 0;
    var i;

    for (i = 0; i < 4; i++) {
      if (guessN[i] == answer[i]) {
        // console.log("a bull found");
        bullsTemp = bullsTemp + 1;
      } else {
        var restOfAnswer = [...answer];
        restOfAnswer.splice(i, 1);
        // console.log("value compared: ", guessN[i]);
        // console.log("rest of answer: ", restOfAnswer);
        if (restOfAnswer.includes(guessN[i])) {
          cowsTemp = cowsTemp + 1;
          // console.log("a cow found");
        }
      }
    }

    if (bullsTemp == 4) {
      setWonMsg("Congratulations! You have guessed the number.");
    }

    console.log("[Bulls][Cows]", bullsTemp, cowsTemp);
    setBulls(bullsTemp);
    setCows(cowsTemp);
  }
  
  function getGuess(index) {
    if (guesses.length == index) {
      return guesses[index];
    }
  }




  return (
    <div className="App">
      <h1>4Digits Game</h1>
      <p>{wonMsg}</p>
      <p>(Temp) Answer: {answer}</p>
      <p>
        <button onClick={newGame}>
          New Game
        </button>
      </p>
      <p>
        <input type="text"
               value={guess}
               maxLength={4}
               onChange={updateGuess}
               onKeyPress={(keyPress)}/>
        <button onClick={submitGuess}>
          Guess
        </button>
      </p>
      <p>Guesses: {guesses}</p>
      <p>Bulls: {bulls}</p>
      <p>Cows: {cows}</p>
      <table id="records">
        <tbody>
          <tr>
            <td>Guess #</td>
            <td></td>
            <td>Bulls</td>
            <td>Cows</td>
          </tr>
          <tr>
            <td>1</td>
            <td>{getGuess(0)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>{getGuess(2)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>{getGuess(3)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>{getGuess(4)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>{getGuess(5)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td>{getGuess(6)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td>{getGuess(7)}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td>{getGuess(8)}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default App;