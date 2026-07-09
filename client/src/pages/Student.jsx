import { useEffect, useState } from "react";
import socket from "../socket";

function Student() {

  const [boardText, setBoardText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {

    socket.on("board-update", (text) => {
      setBoardText(text);
    });


    socket.on("show-image", (url) => {
      setImageUrl(url);
    });

    socket.on("show-quiz", (quizData) => {
  setQuiz(quizData);
  setTimeLeft(quizData.duration);
  setSelectedOption("");
});


    return () => {
      socket.off("board-update");
      socket.off("show-image");
      socket.off("show-quiz");
    };

  }, []);

  useEffect(() => {
  if (!quiz || timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);

}, [quiz, timeLeft]);


  return (
    <div>

      <h1>Student View</h1>

      <h3>Live Board</h3>

      <p>{boardText}</p>


      <h3>Media Push</h3>

      {
        imageUrl && (
          <img 
            src={imageUrl}
            width="400"
            alt="Teacher shared"
          />
        )
      }


      <hr />

<h3>Quiz</h3>

{quiz && (
  <div
    style={{
      border: "2px solid black",
      padding: "20px",
      width: "400px",
      marginTop: "20px",
    }}
  >
    <h4>{quiz.question}</h4>
    <p><strong>Time Left:</strong> {timeLeft} seconds</p>

    {quiz.options.map((option, index) => (
      <button
  key={index}
  onClick={() => setSelectedOption(option)}
  disabled={timeLeft === 0}
  style={{
    display: "block",
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    cursor: "pointer",
    border: "1px solid #ccc",
    backgroundColor:
      selectedOption === option ? "#90EE90" : "#f5f5f5",
    color: "#000",
  }}
>
  {option}
</button>


    ))}

    {selectedOption && (
  <p>
    <strong>You selected:</strong> {selectedOption}
    {timeLeft === 0 && (
  <h3 style={{ color: "red" }}>
    Time's Up!
  </h3>
)}
  </p>

  
)}
  </div>
)}

    </div>
  );
}

export default Student;