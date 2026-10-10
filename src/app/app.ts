import { Component, OnInit, computed, signal } from '@angular/core';
import { ConnectBD } from './shared/services/connect-db';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header-component/header-component';
import { taskLabel } from './shared/enums/Tasks';
import { enemyLabel } from './shared/enums/Enemies';
import { cleanMessage } from './shared/utilities';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [RouterOutlet, HeaderComponent],
})
export class App implements OnInit {
  protected readonly warData = signal<any>(null);
  protected readonly majorOrderData = signal<any>(null);
  protected readonly dispatchData = signal<any>(null);

  protected readonly taskLabel = taskLabel;
  protected readonly cleanMessage = cleanMessage;
  protected readonly enemyLabel = enemyLabel;
  protected readonly horasMajorOrder = computed(() => {
    const s = this.majorOrderData()?.expiresIn;
    return s == null ? null : Math.floor(s / 3600);
  });

  constructor(private connectbd: ConnectBD) {}

  ngOnInit() {
    this.connectbd.getGalacticWar().subscribe({
      next: (res) => this.warData.set(res),
      error: (err) => console.error('Error - Could not load the stats:', err)
    });
    this.connectbd.getMajorOrder().subscribe({
      next: (res) => this.majorOrderData.set(res[0] ?? null),
      error: (err) => console.error('Error - Could not load the major order', err)
    });
    this.connectbd.getDispatches().subscribe({
      next: (res) => this.dispatchData.set(res[0] ?? null),
      error: (err) => console.error('Error - Could not load the dispatch', err)
    });
  }
}