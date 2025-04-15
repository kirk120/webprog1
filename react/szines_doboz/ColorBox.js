const ColorBox = ({ color }) => {
    return React.createElement(
      "div",
      {
        style: {
          width: "200px",
          height: "200px",
          backgroundColor: color,
          margin: "20px auto",
          border: "1px solid black",
        },
      },
      null
    );
  };
  
  export default ColorBox;
  