import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private readonly elt: ElementRef<HTMLInputElement>) {
    //console.log('appAutofocus instanciated :-)');
    //this.elt.nativeElement.focus(); ne pas mettre ici car  la patie visuelle n'est pas complètement finie (pas encore rattachée au DOM)
  }

  ngOnInit(): void {
    this.elt.nativeElement.select();
  }
}
