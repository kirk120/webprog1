import ColorBox from './ColorBox.js';
import ColorChanger from './ColorChanger.js';

const ColorBoxApp = () => {
  const [color, setColor] = React.useState("#ffffff");

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { style: { textAlign: "center" } },
      "Színes Doboz Generátor"
    ),
    React.createElement(ColorBox, { color }),
    React.createElement(ColorChanger, { onColorChange: handleColorChange })
  );
};

export default ColorBoxApp;
