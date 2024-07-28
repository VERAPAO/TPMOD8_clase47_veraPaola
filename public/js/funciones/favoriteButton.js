// // favoriteButton.js
// window.onload = () => {
//     const app = document.getElementById("root");
  
   
//     const favoriteButton = document.createElement("button");
//     favoriteButton.textContent = "Mis películas favoritas";
//     favoriteButton.setAttribute("id", "favoriteButton");
//     favoriteButton.classList.add("botonAgregar"); 
//     favoriteButton.style.marginBottom = "20px"; 
//     favoriteButton.addEventListener('click', () => {
//       window.location.href = '/favoritas'; 
//     });
  
   
//     const checkFavorites = () => {
//       const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
//       if (favoriteMovies.length > 0) {
//         if (!document.getElementById("favoriteButton")) {
//           app.insertBefore(favoriteButton, app.firstChild); 
//         }
//       } else {
//         if (document.getElementById("favoriteButton")) {
//           app.removeChild(favoriteButton); 
//         }
//       }
//     };
  
    
//     checkFavorites();
  
    
//     const observer = new MutationObserver(checkFavorites);
//     observer.observe(document.body, { childList: true, subtree: true });
//   };