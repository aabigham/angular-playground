import {Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {interval, map, Observable} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: -1}); // dont need to cleanup except manual cleanup property to true
  customInterval$ = new Observable(subscriber => {
    let c = 0;
    const interval = setInterval(() => {
      if (c > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value');
      subscriber.next({message: 'new value'});
      c++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // });
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map(value => value * 2)
    // ).subscribe({
    //   next: value => console.log(value)
    // });
    //
    // // When the component gets destroyed (could use onDestroy interface too)
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
    let subscription = this.clickCount$.subscribe(prevCount => console.log(prevCount));
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
