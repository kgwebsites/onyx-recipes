const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  let month = (d.getMonth() + 1).toString();
  if (month.length < 2) {
    month = `0${month}`;
  }
  let day = d.getDate().toString();
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${d.getFullYear()}-${month}-${day}`;
};

module.exports = {
  getTomorrowDate,
};
