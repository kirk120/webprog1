import TextInput from './TextInput.js';
import TextStats from './TextStats.js';

const TextCounterApp = () => {
  const [text, setText] = React.useState("");

  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { style: { textAlign: "center" } },
      "Szöveg Számláló"
    ),
    React.createElement(TextInput, { text, setText }),
    React.createElement(TextStats, { text })
  );
};

export default TextCounterApp;
