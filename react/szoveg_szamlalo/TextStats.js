const TextStats = ({ text }) => {
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).filter((word) => word).length;
  
    return React.createElement(
      "div",
      { style: { textAlign: "center", marginTop: "20px" } },
      React.createElement("p", null, `Karakterek száma: ${charCount}`),
      React.createElement("p", null, `Szavak száma: ${wordCount}`)
    );
  };
  
  export default TextStats;
  