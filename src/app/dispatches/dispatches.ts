import { Component, signal } from '@angular/core';
import { ConnectBD } from '../shared/services/connect-db';
import { cleanMessage } from '../shared/utilities';

@Component({
  selector: 'app-dispatches',
  imports: [],
  templateUrl: './dispatches.html',
  styleUrl: './dispatches.css',
})
export class Dispatches {

  protected readonly dispatchData = signal<any>(null);
  protected readonly cleanMessage = cleanMessage;

  constructor(private connectbd: ConnectBD) {}

  ngOnInit() {
    this.connectbd.getDispatches().subscribe({
      next: (res) => this.dispatchData.set(res),
      error: (err) => console.error('Error - Could not load the dispatch', err)
    });
  }
}
