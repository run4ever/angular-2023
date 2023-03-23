import rxjs, { interval, Observable } from "rxjs";

//const obs = interval(1000); // publie un nb toutes les secondes

//on va redéfinir cette fonction nous meme :
const interval2 = (delayMs) => {
  return new Observable((s) => {
    let n = 0;
    const timer = setInterval(() => {
      console.log("n=" + n);
      s.next(n);
      n++;
    }, delayMs);

    return () => {
      clearInterval(timer);
    };
  });
};

const obs = interval2(1000);
//obs.subscribe(console.log);
const subscription = obs.subscribe(console.log);

setTimeout(() => {
  subscription.unsubscribe();
}, 3500);
