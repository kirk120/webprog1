const TextInput = ({ text, setText }) => {
    const handleInputChange = (event) => {
      setText(event.target.value);
    };
  
    return React.createElement(
      "div",
      { style: { textAlign: "center", marginBottom: "20px" } },
      React.createElement("textarea", {
        rows: 4,
        cols: 50,
        placeholder: "Írd be a szöveget...",
        value: text,
        onChange: handleInputChange,
      })
    );
  };
  
  export default TextInput;
  