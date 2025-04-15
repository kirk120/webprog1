const ColorChanger = ({ onColorChange }) => {
    const [inputColor, setInputColor] = React.useState("");
  
    const handleInputChange = (event) => {
      setInputColor(event.target.value);
    };
  
    const handleButtonClick = () => {
      onColorChange(inputColor);
    };
  
    return React.createElement(
      "div",
      { style: { textAlign: "center" } },
      React.createElement("input", {
        type: "text",
        placeholder: "Pl. #ff0000",
        value: inputColor,
        onChange: handleInputChange,
      }),
      React.createElement("button", { onClick: handleButtonClick }, "Szín módosítása")
    );
  };
  
  export default ColorChanger;
  