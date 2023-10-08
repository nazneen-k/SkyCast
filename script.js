function displayDay() {
  let day = new Date();
  day = day.toString().split(" ");
  document.querySelector("#day").innerHTML = day[0];
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] ;
}

window.onload = function () {
  displayDay();
  displayDate();
};
