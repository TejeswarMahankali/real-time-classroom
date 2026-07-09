import { useState } from "react";
import socket from "../socket";

function Teacher() {

  const [text, setText] = useState("");

  const sendImage = () => {
  const imageUrl =
  "https://picsum.photos/400/300";

  socket.emit("show-image", imageUrl);
};

const sendQuiz = () => {
  console.log("Start Quiz button clicked!");

  const quiz = {
    question: "Which language is used for React?",
    options: [
      "Java",
      "Python",
      "JavaScript",
      "C++"
    ],
    answer: "JavaScript",
    duration: 30
  };

  console.log("Sending quiz:", quiz);

  socket.emit("show-quiz", quiz);
};

  return (
    <div>

      <h1>Teacher Dashboard</h1>

      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => {
        setText(e.target.value);
        socket.emit("board-update", e.target.value);
        }}
      />

      <br />
<br />

<button onClick={sendImage}>
  Show Image
</button>

<br />
<br />

<button onClick={sendQuiz}>
  Start Quiz
</button>

    </div>
  );

}

export default Teacher;