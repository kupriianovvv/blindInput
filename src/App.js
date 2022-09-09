import { useState, useEffect, useRef } from "react";
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
  const [text, setText] = useState(TEXT)
  const [inputText, setInputText] = useState("");
  const [mistakeIndexes, setMistakeIndexes] = useState([2]);
  const [statistics, setStatistics] = useState({})
  const inputRef = useRef();

  const [timeToFinish, { start, reset }] = useCountDown(
    TIME_IN_SECONDS * 1000,
    100
  )

  const getText = async () => {
    const response = await fetch("https://baconipsum.com/api/?type=all-meat&sentences=5");
    const json = await response.json();
    setText(json[0]);
    setInputText("");
  }

  const startTimer = async () => {
    setInputText("");
    inputRef.current.focus(); 
    start();
  }

  const resetTimer = () => {
    setInputText("");
    reset();
  }

  useEffect(() => {
    setMistakeIndexes(getMistakesIndexes(text, inputText))
  }, [text, inputText])

  useEffect(() => {
    if (timeToFinish !== 0) return;
    if (inputText.length === 0) return;

    const numOfChars = inputText.length - mistakeIndexes.length;
    const charsPerSecond = (numOfChars / TIME_IN_SECONDS).toFixed(2);
    const percentOfCorrentChars = (numOfChars / inputText.length * 100).toFixed(2)
    setInputText("");
    setStatistics({ charsPerSecond, percentOfCorrentChars })
    //alert(`${charsPerSecond} correct characters per second, ${percentOfCorrentChars}% is correct`)
  }, [timeToFinish])

  return (
    <main className="App">
      <section className="controls">
        <p className="timer">{(timeToFinish / 1000).toFixed(2)}</p>
        <button className="start" onClick={() => startTimer()}>start</button>
        <button className="reset" onClick={() => resetTimer()}>reset</button>
        <button className="getText" onClick={() => getText()}>get new text</button>
        {statistics.charsPerSecond !== undefined && <h3>{statistics.charsPerSecond} correct chars per second</h3>}
        {statistics.percentOfCorrentChars !== undefined && <h3>{statistics.percentOfCorrentChars}% is correct</h3>}
      </section>

      <section className="input">
        <p>
          {
            text.split("").map((char, index) => {
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
          ref={inputRef}
        />
      </section>
    </main>
  );
}

export default App;
