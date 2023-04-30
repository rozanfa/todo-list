const priorityColor = (priority) => {
  switch (priority) {
    case "very-high":
      return "#ED4C5C";
    case "high":
      return "#FFCE31";
    case "normal":
      return "#00A790";
    case "low":
      return "#43C4E3";
    case "very-low":
      return "#B01AFF";
    default:
      return "#555555";
  }
};

export default priorityColor;
