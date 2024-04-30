export const dateConverter = (date: string) => {
  if (!date) return "";
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}/${month}/${day}`;
};

export const calcBadgeColor = (str: string) => {
  let color = "Blue";
  switch (str) {
    case "Easy":
      color = "Lightgreen";
      break;
    case "Medium":
      color = "Orange";
      break;
    case "Hard":
      color = "Red";
      break;
    default:
      color = "Blue";
  }
  return color;
};
