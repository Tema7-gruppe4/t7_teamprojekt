// BURGER MENU
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
