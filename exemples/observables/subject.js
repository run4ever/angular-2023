//un subject est un observable, un subject extends observable
const rxjs = require("rxjs");

const { Subject } = rxjs;

const subject = new Subject();

subject.next(34); //personne ne l'aura car le subject n'est écouté que plus bas

setTimeout(() => {
  subject.next(56);
  subject.complete();
}, 1000); //celui ci sera entendu car déclenché 1s plus tard

//on branche 2 écouteurs dessus, ce qu'on ne pouvait pas faire avec l'observable classique
//le subject ne génère ses evenements qu'une fois mais 2 personnes écoutent
//dans l'obs classique, si on crée une 2ème ecouteur, ca crée une 2ème instance de l'obs, donc les evenements seront générés en double
//un behavior subject génère une publication dès que qqun l'ecoute en donnant la dernière publication publiée
//donc pratique pour avoir la dernière valeur de l'observable
const subscriber1 = subject.subscribe({
  // on ecoute : "a chaque publication, affiche la donnée publiée"
  next: (data) => {
    console.log("subscriber1 data: ", data);
  },
  error: (err) => {
    console.log("subscriber1 err : ", err);
  },
  complete: () => {
    console.log("subscriber1 complete");
  },
});

const subscriber2 = subject.subscribe({
  // on ecoute : "a chaque publication, affiche la donnée publiée"
  next: (data) => {
    console.log("subscriber2 data: ", data);
  },
  error: (err) => {
    console.log("subscriber2 err : ", err);
  },
  complete: () => {
    console.log("subscriber2 complete");
  },
});
