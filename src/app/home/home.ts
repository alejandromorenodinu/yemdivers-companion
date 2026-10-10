import { Component, computed, signal } from '@angular/core';
import { ConnectBD } from '../shared/services/connect-db';
import { taskLabel } from '../shared/enums/Tasks';
import { cleanMessage } from '../shared/utilities';
import { enemyLabel } from '../shared/enums/Enemies';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly warData = signal<any>(null);
  protected readonly majorOrderData = signal<any>(null);
  protected readonly dispatchData = signal<any>(null);
  protected readonly planets = signal<any[]>([]);

  protected readonly taskLabel = taskLabel;
  protected readonly cleanMessage = cleanMessage;
  protected readonly enemyLabel = enemyLabel;
  protected readonly horasMajorOrder = computed(() => {
    const s = this.majorOrderData()?.expiresIn;
    return s == null ? null : Math.floor(s / 3600);
  });
  private readonly planetNames = computed(() =>
    new Map<number, any>(this.planets().map((p): [number, any] => [p.index, p.name]))
  );

  getPlaneta(index:number) {
    const name = this.planetNames().get(index);
    return name;
  }
  
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
    this.connectbd.getAllPlanets().subscribe({
      next: (res) => this.planets.set(res),
      error: (err) => console.error('Error - Could not load the planets:', err)
    });
  }
}
