


window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  /*-------ACÁ AGREGAMOS UN BOTÓN JUSTAMENTE AGREGAR PELÍCULA------------ */
  const addButton = document.createElement("button");
  addButton.textContent = "Agregar Película";
  addButton.setAttribute("id", "addMovieButton");
  addButton.classList.add("botonAgregar");
  addButton.style.marginBottom = "20px";
  addButton.addEventListener('click', () => {
    window.location.href = '/formularios';
  });
  app.appendChild(addButton);

  /*-----------CREAMOS EL BOTÓN PARA VOLVER AL INICIO---------- */
  const homeButton = document.createElement("button");
  homeButton.textContent = "Inicio";
  homeButton.setAttribute("id", "homeButton");
  homeButton.classList.add("botonAgregar");
  homeButton.style.marginTop = "20px";
  homeButton.addEventListener('click', () => {
    window.location.href = '/';
  });
  app.appendChild(homeButton);

  /* CREAMOS EL CONTENEDOR DE LAS PELÍCULAS */
  app.appendChild(container);

  /* -------FUNCIÓN PARA HACER EL FETCH Y OBTENER LAS PELIS--------------- */

  const obtenerPeliculas = async () => {
    let peliculas;

    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      peliculas = await response.json();

      if (peliculas && peliculas.data && Array.isArray(peliculas.data)) {
        let data = peliculas.data;

        data.forEach((movie) => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

       
          const titleContainer = document.createElement("div");
          titleContainer.classList.add("title-container");

          const h1 = document.createElement("h1");
          h1.textContent = movie.title;

          const star = document.createElement("i");
          star.classList.add("fa", "fa-star");
          star.classList.add("star");
          star.style.cursor = "pointer";

        
          const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
          if (favoriteMovies.includes(movie.id)) {
            star.classList.remove("far");
            star.classList.add("fas");
          } else {
            star.classList.remove("fas");
            star.classList.add("far");
          }

        
          star.addEventListener('click', (event) => {
            event.stopPropagation();
            const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
            
            if (favoriteMovies.includes(movie.id)) {
              const index = favoriteMovies.indexOf(movie.id);
              if (index > -1) {
                favoriteMovies.splice(index, 1);
              }
              star.classList.remove("fas");
              star.classList.add("far");
            } else {
              favoriteMovies.push(movie.id);
              star.classList.remove("far");
              star.classList.add("fas");
            }
            
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
            checkFavorites(); 
          });

          titleContainer.appendChild(h1);
          titleContainer.appendChild(star);

       
          card.appendChild(titleContainer);

          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;

          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;

  
          const button = document.createElement("button");
          button.textContent = "Ver más";
          button.classList.add("verMasButton");
          button.addEventListener('click', (event) => {
            event.stopPropagation();
            window.location.href = `/formularios/${movie.id}`;
          });

          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
          card.appendChild(button);

          container.appendChild(card);
        });
      } else {
        console.error('No se encontraron datos de películas o la estructura es incorrecta.');
      }
    } catch (error) {
      console.error('Error al obtener datos de películas:', error);
    }
  };

  obtenerPeliculas();

  const checkFavorites = () => {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const favoriteButton = document.getElementById("favoriteButton");
    if (favoriteMovies.length > 0) {
      if (!favoriteButton) {
       
        const newFavoriteButton = document.createElement("button");
        newFavoriteButton.textContent = "Mis películas favoritas";
        newFavoriteButton.setAttribute("id", "favoriteButton");
        newFavoriteButton.classList.add("botonAgregar");
        newFavoriteButton.style.marginBottom = "20px";
        newFavoriteButton.addEventListener('click', () => {
          window.location.href = '/favoritas'; 
        });
        app.insertBefore(newFavoriteButton, app.firstChild); 
      }
    } else {
      if (favoriteButton) {
        app.removeChild(favoriteButton); 
      }
    }
  };

  
  checkFavorites();
};



// window.onload = () => {
//   const app = document.getElementById("root");
//   const container = document.createElement("div");
//   container.setAttribute("class", "container");

//   // Crear el botón de "Agregar Película" con clase de estilo
//   const addButton = document.createElement("button");
//   addButton.textContent = "Agregar Película";
//   addButton.setAttribute("id", "addMovieButton");
//   addButton.classList.add("botonAgregar"); // Aplicar clase de estilo del CSS
//   addButton.style.marginBottom = "20px"; // Espacio debajo del botón para separación visual

//   // Añadir un evento de clic al botón
//   addButton.addEventListener('click', () => {
//     window.location.href = '/formularios'; // Redirige al formulario vacío para agregar una nueva película
//   });

//   // Añadir el botón al contenedor principal
//   app.appendChild(addButton);

//   // Crear el botón "Inicio"
//   const homeButton = document.createElement("button");
//   homeButton.textContent = "Inicio";
//   homeButton.setAttribute("id", "homeButton");
//   homeButton.classList.add("botonAgregar"); // Usar la misma clase que el botón de Agregar Película
//   homeButton.style.marginTop = "20px"; // Espacio encima del botón para separación visual

//   // Añadir un evento de clic al botón
//   homeButton.addEventListener('click', () => {
//     window.location.href = '/'; // Redirige a la página de inicio
//   });

//   // Añadir el botón "Inicio" al contenedor principal
//   app.appendChild(homeButton);

//   // Añadir el contenedor de películas
//   app.appendChild(container);

//   const obtenerPeliculas = async () => {
//     let peliculas;

//     try {
//       const response = await fetch('/api/movies'); 
//       if (!response.ok) { 
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }
   
//       peliculas = await response.json(); 
      
//       if (peliculas && peliculas.data && Array.isArray(peliculas.data)) {
//         let data = peliculas.data;

//         data.forEach((movie) => {
//           const card = document.createElement("div");
//           card.setAttribute("class", "card");

//           // Crear un contenedor para el título y la estrella
//           const titleContainer = document.createElement("div");
//           titleContainer.classList.add("title-container");

//           const h1 = document.createElement("h1");
//           h1.textContent = movie.title;

//           // Crear la estrella
//           const star = document.createElement("i");
//           star.classList.add("fa", "fa-star"); // Usa la clase de Font Awesome para la estrella
//           star.classList.add("star"); // Aplica la clase de estilo para la estrella
//           star.style.cursor = "pointer"; // Cambia el cursor cuando se pasa sobre la estrella

//           // Determinar si la película está en favoritos al cargar
//           const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
//           if (favoriteMovies.includes(movie.id)) {
//             star.classList.remove("far");
//             star.classList.add("fas");
//           } else {
//             star.classList.remove("fas");
//             star.classList.add("far");
//           }

//           // Añadir un evento de clic a la estrella
//           star.addEventListener('click', (event) => {
//             event.stopPropagation(); // Evita que el clic en la estrella también active el clic en la tarjeta
//             const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
            
//             if (favoriteMovies.includes(movie.id)) {
//               // Si la película ya está en favoritos, eliminarla
//               const index = favoriteMovies.indexOf(movie.id);
//               if (index > -1) {
//                 favoriteMovies.splice(index, 1);
//               }
//               star.classList.remove("fas"); // Cambia el estilo para indicar que no es favorita
//               star.classList.add("far");
//             } else {
//               // Si la película no está en favoritos, añadirla
//               favoriteMovies.push(movie.id);
//               star.classList.remove("far"); // Cambia el estilo para indicar que es favorita
//               star.classList.add("fas");
//             }
            
//             localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies)); // Almacena la lista actualizada de favoritos
//           });

//           // Añadir el título y la estrella al contenedor
//           titleContainer.appendChild(h1);
//           titleContainer.appendChild(star);

//           // Añadir el contenedor de título y estrella al card
//           card.appendChild(titleContainer);

//           const p = document.createElement("p");
//           p.textContent = `Rating: ${movie.rating}`;

//           const duracion = document.createElement("p");
//           duracion.textContent = `Duración: ${movie.length}`;

//           // Crear el botón "Ver más"
//           const button = document.createElement("button");
//           button.textContent = "Ver más";
//           button.classList.add("verMasButton");

//           // Añadir un evento de clic al botón
//           button.addEventListener('click', (event) => {
//             event.stopPropagation(); // Para evitar que el clic en el botón también active el clic en la tarjeta
//             window.location.href = `/formularios/${movie.id}`;
//           });

//           card.appendChild(p);
//           if (movie.genre !== null) {
//             const genero = document.createElement("p");
//             genero.textContent = `Genero: ${movie.genre.name}`;
//             card.appendChild(genero);
//           }
//           card.appendChild(duracion);
//           card.appendChild(button); // Añadir el botón a la tarjeta

//           container.appendChild(card);
//         });
//       } else {
//         console.error('No se encontraron datos de películas o la estructura es incorrecta.');
//       }
//     } catch (error) {
//       console.error('Error al obtener datos de películas:', error); 
//     }
//   };

//   obtenerPeliculas();
// };

