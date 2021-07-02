// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners(){
  formulario.addEventListener('submit',agregarTweet);

  document.addEventListener('DOMContentLoaded',() =>{
    tweets = JSON.parse(window.localStorage.getItem('tweets')) || [];
    crearHTML();
  })

}


// Funciones

function agregarTweet(e){
  e.preventDefault();

  // TextArea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;

  // Validacion
  if(tweet === ''){
    mostrarError('Un mensaje no puede ir vacio');
    return; // evita que se ejecuten mas lineas de codigo
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  // añadir al arreglo de tweets
  tweets= [...tweets, tweetObj]

  crearHTML();

}


function mostrarError(error){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');


  // insertarlo en el contenido
  const contenido = document.querySelector('#contenido');
  
  if(!document.querySelector('.error')){
    contenido.appendChild(mensajeError);
  }
  setTimeout(() =>{
    mensajeError.remove();
  },3000)
}


// Muestra un listado de los tweets

function crearHTML(){
  limpiarHTML();
  if(tweets.length > 0 ){
    tweets.forEach(tweet =>{
      const li = document.createElement('li');
      li.innerText = tweet.tweet;
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';

      // Añadir la funcion eliminar
      btnEliminar.onclick = () =>{
        borrarTweet(tweet.id);
      }


      li.appendChild(btnEliminar);
      

      listaTweets.appendChild(li);

    })
  }
  sincronizarStorage();
}


function sincronizarStorage(){
  window.localStorage.setItem('tweets', JSON.stringify(tweets));
}


function borrarTweet(id){
  tweets = tweets.filter(tweet => tweet.id !== id)
  crearHTML();
}


function limpiarHTML(){
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
