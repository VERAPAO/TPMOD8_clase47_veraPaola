window.onload = function(){
    //JavaScript del Index
    let container = document.querySelector('.container');
    let subtitulo = document.querySelector('.subtitulo');
    let destacado = document.querySelectorAll('p');
    let enlace = document.querySelector('a');
    
    subtitulo.innerHTML += ' INVITADX';
    
    subtitulo.style.textTransform = 'uppercase';
    
    enlace.style.color = 'white';
    
    for(let i = 0 ; i < destacado.length; i++){
        if(i % 2 == 0){
            destacado[i].classList.add('destacadoPar');
        }else{
            destacado[i].classList.add('destacadoImpar');
        }
    }
    
   // container.style.display = 'block';
}



