const rxjs = require("rxjs");

const { Observable } = rxjs;

const obs = new Observable((subscriber) => {
  //une fois declecnhé, l'observable fera ça :
  subscriber.next(1); //publie la donnée "1"
  subscriber.next(undefined); //on peut publier ce qu'on veut

  const timer = setTimeout(() => {
    console.log("coucou");
    subscriber.next({ toto: 123 });
    subscriber.complete(); //termine l'observable et dit à tout le monde que c'est fini
  }, 2000);

  subscriber.next({ toto: 123 }); //ce next ne sera pas publié car après le complete

  //fonction appelée en dernier ou lors de l'interruption
  return () => {
    console.log("Aaaahh je meurs...");
    clearTimeout(timer); // on libère les ressources
  };
});

//on se branche sur l'observable et on l'écoute
const subscription = obs.subscribe({
  // on ecoute : "a chaque publication, affiche la donnée publiée"
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err : ", err);
  },
  complete: () => {
    console.log("complete");
  },
});
subscription.unsubscribe(); // si on met ça, le résultat change, on n'a pas le dernier affichage et on interrompt le déroulement de l'observable

//resultat qd on fait node obs.js :
/*
data : 1
data : undefined
data : { toto: 123 } //après 1 seconde
complete
*/
