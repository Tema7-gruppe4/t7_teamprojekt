const additionalInfo = document.getElementById("collapsible");
const content = document.getElementById("content");
const more = document.getElementById("viewMore");
const less = document.getElementById("viewLess");

additionalInfo.addEventListener("click", (event) => {
  console.log("click");

  if (content.style.display === "block") {
    content.style.display = "none";
    less.style.visibility = "hidden";
    more.style.visibility = "visible";
  } else {
    content.style.display = "block";
    more.style.visibility = "hidden";
    less.style.visibility = "visible";
  }
});
