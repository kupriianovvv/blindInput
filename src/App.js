import { useState } from "react";

const TIME = 10;
const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacus dolor, volutpat ut suscipit non, ultricies vitae enim. Duis vestibulum risus massa, in pharetra odio porttitor eget. Phasellus vel massa nisl. Nullam auctor eu ex quis eleifend. Phasellus congue odio sed mauris sagittis consequat. Praesent scelerisque vulputate felis, eget suscipit erat hendrerit sit amet. Mauris egestas pretium odio sit amet malesuada.";

const App = () => {
  const [typedText, setTypedText] = useState("");
  return (
    <main className="App">
      <section className="controls">
        <h3 className="timer">00</h3>
        <button className="start">start</button>
        <button className="reset">reset</button>
      </section>

      <section className="input">
        <p>
          {
            TEXT.split("").map((char, index) => {
              let className = "";
              if (typedText.length > index) {
                let mistake = false;
                className = mistake ? "incorrect" : "correct"
              }
              return <span key={index} className={className}>{char}</span>
            })
          }
        </p>
        <textarea
          rows="10"
          placeholder="Type there"
          value={typedText}
          onChange={e => setTypedText(e.target.value)}
        />
      </section>
    </main>
  );
}

export default App;
