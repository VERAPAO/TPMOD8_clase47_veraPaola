window.onload = async () => {
  const app = document.getElementById("root");
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "button-container");
  app.appendChild(buttonContainer);

  const backButton = document.createElement("button");
  backButton.textContent = "Volver al listado de películas";
  backButton.setAttribute("id", "backButton");
  backButton.classList.add("button-back");

  backButton.addEventListener('click', () => {
    window.location.href = '/listado'; 
  });


  buttonContainer.appendChild(backButton);

  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);


  const favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  if (favoriteMovieIds.length === 0) {
    
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const message = document.createElement("p");
    message.textContent = "Aún no tienes películas favoritas.";
    message.classList.add("no-favorites-message");

    messageContainer.appendChild(message);
    container.appendChild(messageContainer);
    return;
  }

  try {
   
    const response = await fetch('/api/movies');
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
   
    const peliculas = await response.json();

    let data = peliculas.data;

    
    const favoriteMovies = data.filter(movie => favoriteMovieIds.includes(movie.id));

    if (favoriteMovies.length === 0) {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");

      const message = document.createElement("p");
      message.textContent = "Aún no tienes películas favoritas.";
      message.classList.add("no-favorites-message");

      messageContainer.appendChild(message);
      container.appendChild(messageContainer);
    } else {
      
      favoriteMovies.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);

        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error('Error al obtener datos de películas:', error);
  }
};

