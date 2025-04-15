import ColorBoxApp from './szines_doboz/ColorBoxApp.js';
import TextCounterApp from './szoveg_szamlalo/TextCounterApp.js';

const Menu = ({ setActivePage }) => {
    return React.createElement(
      "div",
      { style: { textAlign: "center", marginBottom: "20px" } },
      React.createElement(
        "button",
        {
          onClick: () => setActivePage("colorBox"),
          style: {
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          },
          onMouseEnter: (e) => (e.target.style.backgroundColor = "#0056b3"),
          onMouseLeave: (e) => (e.target.style.backgroundColor = "#007BFF"),
        },
        "Színes Doboz Generátor"
      ),
      React.createElement(
        "button",
        {
          onClick: () => setActivePage("textCounter"),
          style: {
            backgroundColor: "#28A745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            margin: "10px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          },
          onMouseEnter: (e) => (e.target.style.backgroundColor = "#218838"),
          onMouseLeave: (e) => (e.target.style.backgroundColor = "#28A745"),
        },
        "Szöveg Számláló"
      )
    );
  };
  

const App = () => {
  const [activePage, setActivePage] = React.useState("colorBox");

  return React.createElement(
    "div",
    null,
    React.createElement(Menu, { setActivePage }),
    activePage === "colorBox"
      ? React.createElement(ColorBoxApp)
      : React.createElement(TextCounterApp)
  );
};

export default App;
