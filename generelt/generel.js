// BURGER MENU OG SØGEFELT
// Hent
var searchIcon = document.getElementById("search-icon");
var searchField = document.getElementById("search-field");

// klik på forstørrelsesglasset
searchIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  searchField.classList.toggle("active");
  searchField.focus();
});

// Skjuler søgefeltet hvis der klikkes et andet sted på skærmen
document.addEventListener("click", function (event) {
  if (!searchField.contains(event.target) && event.target !== searchIcon) {
    searchField.classList.remove("active");
  }
});
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
