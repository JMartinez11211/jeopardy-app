import { useState } from "react";

export default function GameApp() {
  const [game, setGame] = useState({
    category: "",
    points: "",
    answer: " ",
    question: " ",
  });
  const [count, setCount] = useState(0);

  function handleClick() {
    fetch("http://jservice.io/api/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setGame({
          category: data[0].category.title,
          points: data[0].value,
          answer: data[0].answer,
          question: data[0].question,
        });
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function add() {
    setCount((prevCount) => prevCount + game.points);
  }

  function sub() {
    setCount((prevCount) => prevCount - game.points);
  }

  function reset() {
    setCount(0);
  }

  const [show, setShow] = useState(false);

  return (
    <div>
      <h1 id="title">Welcome to Jeopardy!</h1>
      <h2><span className="text">Score:</span> {count} </h2>
      <div>
        <button onClick={sub} id="sub">Decrease</button>
        <button onClick={add} id="add">Increase</button>
        <button onClick={reset} id="reset">Reset</button>
      </div>
      <h2 className="text">Let's Play!</h2>
      <button onClick={handleClick} id="questionButton">Get Question</button>
      <h2><span className="text">Category:</span> {game.category}</h2>
      <h2><span className="text">Points:</span> {game.points}</h2>
      <h2><span className="text">Answer:</span> {game.question}</h2>
      <button onClick={() => setShow(true)} id="revealButton">Click to Reveal Question</button>
      {show ? <h2>What is {game.answer} ?</h2> : null}
    </div>
  );
}
