import { useState, useEffect } from "react";
import useCountDown from "./hooks/useCountDown";

const TIME_IN_SECONDS = 10;
const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacus dolor, volutpat ut suscipit non, ultricies vitae enim. Duis vestibulum risus massa, in pharetra odio porttitor eget. Phasellus vel massa nisl. Nullam auctor eu ex quis eleifend. Phasellus congue odio sed mauris sagittis consequat. Praesent scelerisque vulputate felis, eget suscipit erat hendrerit sit amet. Mauris egestas pretium odio sit amet malesuada.";

const getMistakesIndexes = (text, input) => {
  const mistakes = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== text[i]) mistakes.push(i);
  }
  return mistakes;
}

const App = () => {
  const [inputText, setInputText] = useState("");
  const [mistakeIndexes, setMistakeIndexes] = useState([2]);

  const [timeToFinish, { start, reset }] = useCountDown(
    TIME_IN_SECONDS * 1000,
    100
  )

  useEffect(() => {
    setMistakeIndexes(getMistakesIndexes(TEXT, inputText))
  }, [inputText])

  return (
    <main className="App">
      <section className="controls">
        <h3 className="timer">{(timeToFinish / 1000).toFixed(2)}</h3>
        <button className="start" onClick={() => start()}>start</button>
        <button className="reset" onClick={() => reset()}>reset</button>
      </section>

      <section className="input">
        <p>
          {
            TEXT.split("").map((char, index) => {
              let className = null; //className=null не будет добавлен в DOM, так что пустых классов не будет
              if (inputText.length > index) {
                let isMistake = mistakeIndexes.includes(index)
                className = isMistake ? "incorrect" : "correct"
              }
              return <span key={index} className={className}>{char}</span>
            })
          }
        </p>
        <textarea
          rows="10"
          placeholder="Type there"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </section>
    </main>
  );
}

export default App;
