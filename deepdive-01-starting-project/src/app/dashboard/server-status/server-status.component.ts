import {AfterViewInit, Component, DestroyRef, effect, OnDestroy, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  // currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  // private intervalId?: ReturnType<typeof setTimeout>;

  constructor(private destroyRef: DestroyRef) {
    // The effect function listens to signal changes
    effect(onCleanup => {
      console.log('ServerStatusComponent Signal Effect', this.currentStatus());
      onCleanup(() => console.log('ServerStatusComponent Signal Effect Cleanup'));
    });
  }

  ngOnInit(): void {
    console.log('ServerStatusComponent NG ON INIT')
    const interval = setInterval(() => {
      const random = Math.random(); // 0-0.999999
      this.currentStatus.set(random < 0.5 ? 'online' : random < 0.9 ? 'offline' : 'unknown');
    }, 5000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  ngAfterViewInit(): void {
    console.log('ServerStatusComponent NG AFTER VIEW INIT')
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.intervalId);
  // }

}
