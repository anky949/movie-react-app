export const getMintuesToHours = (totalMinutes) => {
  var hours = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;
  return hours + " h "+ minutes + "min" ;
}