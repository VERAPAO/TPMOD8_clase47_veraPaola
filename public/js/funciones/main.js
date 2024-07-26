window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  // Crear el botón de "Agregar Película" con clase de estilo
  const addButton = document.createElement("button");
  addButton.textContent = "Agregar Película";
  addButton.setAttribute("id", "addMovieButton");
  addButton.classList.add("botonAgregar"); // Aplicar clase de estilo del CSS
  addButton.style.marginBottom = "20px"; // Espacio debajo del botón para separación visual

  // Añadir un evento de clic al botón
  addButton.addEventListener('click', () => {
    window.location.href = '/formularios'; // Redirige al formulario vacío para agregar una nueva película
  });

  // Añadir el botón al contenedor principal
  app.appendChild(addButton);

  // Crear el botón "Inicio"
  const homeButton = document.createElement("button");
  homeButton.textContent = "Inicio";
  homeButton.setAttribute("id", "homeButton");
  homeButton.classList.add("botonAgregar"); // Usar la misma clase que el botón de Agregar Película
  homeButton.style.marginTop = "20px"; // Espacio encima del botón para separación visual

  // Añadir un evento de clic al botón
  homeButton.addEventListener('click', () => {
    window.location.href = '/'; // Redirige a la página de inicio
  });

  // Añadir el botón "Inicio" al contenedor principal
  app.appendChild(homeButton);

  // Añadir el contenedor de películas
  app.appendChild(container);

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

          const h1 = document.createElement("h1");
          h1.textContent = movie.title;

          const p = document.createElement("p");
          p.textContent = `Rating: ${movie.rating}`;

          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;

          // Crear el botón "Ver más"
          const button = document.createElement("button");
          button.textContent = "Ver más";
          button.classList.add("verMasButton");

          // Añadir un evento de clic al botón
          button.addEventListener('click', (event) => {
            event.stopPropagation(); // Para evitar que el clic en el botón también active el clic en la tarjeta
            window.location.href = `/formularios/${movie.id}`;
          });

          card.appendChild(h1);
          card.appendChild(p);
          if (movie.genre !== null) {
            const genero = document.createElement("p");
            genero.textContent = `Genero: ${movie.genre.name}`;
            card.appendChild(genero);
          }
          card.appendChild(duracion);
          card.appendChild(button); // Añadir el botón a la tarjeta

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
//   homeButton.classList.add("botonInicio"); // Aplicar clase de estilo del CSS
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

//           const h1 = document.createElement("h1");
//           h1.textContent = movie.title;

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

//           card.appendChild(h1);
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

//   // Añadir el contenedor de películas
//   app.appendChild(container);

//   // Crear el botón "Inicio"
//   const homeButton = document.createElement("button");
//   homeButton.textContent = "Inicio";
//   homeButton.setAttribute("id", "homeButton");
//   homeButton.classList.add("botonInicio"); // Aplicar clase de estilo del CSS
//   homeButton.style.marginTop = "20px"; // Espacio encima del botón para separación visual

//   // Añadir un evento de clic al botón
//   homeButton.addEventListener('click', () => {
//     window.location.href = '/'; // Redirige a la página de inicio
//   });

//   // Añadir el botón "Inicio" al contenedor principal
//   app.appendChild(homeButton);

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

//           const h1 = document.createElement("h1");
//           h1.textContent = movie.title;

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

//           card.appendChild(h1);
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

//           const h1 = document.createElement("h1");
//           h1.textContent = movie.title;

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

//           card.appendChild(h1);
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













// window.onload = () => {
//   const app = document.getElementById("root");
//   const container = document.createElement("div");
//   container.setAttribute("class", "container");
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

//           const h1 = document.createElement("h1");
//           h1.textContent = movie.title;

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

//           card.appendChild(h1);
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



