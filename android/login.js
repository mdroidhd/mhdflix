 // Import the functions you need from the SDKs you need
 import {
     initializeApp
 } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
 import {
     getAnalytics
 } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";


 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
     apiKey: "AIzaSyB6jExeKC8q-NINy8NFHER6-szBMBwcT5I",
     authDomain: "miraculous-pro.firebaseapp.com",
     databaseURL: "https://miraculous-pro-default-rtdb.firebaseio.com",
     projectId: "miraculous-pro",
     storageBucket: "miraculous-pro.appspot.com",
     messagingSenderId: "961258093162",
     appId: "1:961258093162:web:974d46744e89ba0da96813",
     measurementId: "G-YLPRDD2K4X"
 };
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 import {
     getDatabase,
     ref,
     set,
     child,
     update,
     remove
 }
 from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js"
 import {
     getAuth,
     signInWithEmailAndPassword
 } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
 


 const auth = getAuth();

 const database = getDatabase();
 // Inciar Varibales

 let email, password, resLogin;
 let caja, InpMovies, youtube;

 // Asignar Varibales
 resLogin = document.getElementById('ResLogin');
 youtube = document.getElementById('yt');

 function pulsar(e) {
    if (e.keyCode === 13) {
        login();
    }
}
document.onkeydown=function(evt){
    var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    if(keyCode == 13)
    {
        login();
    }
}

 function login() {
     console.log("Estoy en el logear");
     email = document.getElementById('inEmail').value;
     password = document.getElementById('inPassword').value;
     //console.log(email + "---" + password);
     

     signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Signed in
             const user = userCredential.user;
             console.log("Esoy logeado");
             

             //window.open("./UploadMovies.html", "_self");
             
             
             var caja = document.getElementById('box');
             var InpMovies = document.getElementById('box2');
             caja.style = "none"
             InpMovies.style = "block"

            

            
             
         })
         .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             resLogin = document.getElementById('ResLogin').innerText = errorMessage;
         });
 }



//<<-------------Varibales----------->>
const API_KEY = '22328d5d861bf7bf9279303d512e2e5e';
const BASE_URL = 'https://api.themoviedb.org/3/';
const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
let videoURL, agregar, movie_id, video, link, API_URL, ytID;

agregar = document.getElementById("agregar");

agregar.addEventListener('click', (e) => {
    captura();
});

 document.querySelector('button').addEventListener('click', login);

 function captura(){
    console.log("Estoy en el tmdb");


    // Asignar varibales
    movie_id = document.getElementById("tmdbID");
    videoURL = document.getElementById("link");

    //comprobacion valores
    if (movie_id != null && videoURL != null) {
        //console.log(movie_id.value +"____"+videoURL.value);
        searchData(movie_id.value, videoURL.value);
    } else {
        console.log("No hay valores");
    }

}

function searchData(movie_id, video) {
    API_URL = BASE_URL + 'movie/' + movie_id + '?api_key=' + API_KEY + '&language=es-ES';
    getMovies(API_URL, video);
}

function getMovies(url, link) {

    fetch(url).then(res => res.json()).then(data => {
        showData(data, link);
    });
}

function showData(data, link) {
    let TMDBtitulo = data.title;
    console.log(TMDBtitulo);
    console.log(movie_id.value);
    ytID = youtube.value.replaceAll("https://www.youtube.com/watch?v=", "").split("&")[0];

    var obj = {
        titulo: TMDBtitulo,
        Purl: link,
        tmdb: movie_id.value,
        yt: ytID
    }

    set(ref(database, "Peliculas/" + TMDBtitulo), obj);
    console.log("Se a añadido corectamente");
    document.getElementById("ResTMDB").innerHTML = "Se añadido correctamente";

}