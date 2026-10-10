import { Component, computed, OnInit, signal } from '@angular/core';
import { ConnectBD } from '../shared/services/connect-db';

interface View { x: number; y: number; w: number; h: number; }

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})

export class Map implements OnInit {
protected readonly planets = signal<any[]>([]);
  protected readonly selected = signal<any | null>(null);
  protected readonly view = signal<View>({ x: 0, y: 0, w: 1, h: 1 });
  protected readonly aspect = signal(1);

  private home: View = { x: 0, y: 0, w: 1, h: 1 };
  private dragging = false;
  private dragDist = 0;
  private last = { x: 0, y: 0 };

  protected readonly viewBox = computed(() => {
    const v = this.view();
    return `${v.x} ${v.y} ${v.w} ${v.h}`;
  });

  // Radio proporcional al zoom: los puntos mantienen el mismo tamaño en pantalla
  protected readonly r = computed(() => {
    const w = this.view().w;
    return 0.006 * Math.sqrt(this.home.w * w);
  });
  constructor(private connectbd: ConnectBD) {}

  ngOnInit() {
    this.connectbd.getAllPlanets().subscribe({
      next: (res) => {
        this.planets.set(res);
        this.fitAll(res);
      },
      error: (err) => console.error('Error cargando planetas:', err),
    });
  }

  private fitAll(ps: any[]) {
    const xs = ps.map(p => p.position.x);
    const ys = ps.map(p => -p.position.y);
    const pad = 0.05;
    this.home = {
      x: Math.min(...xs) - pad,
      y: Math.min(...ys) - pad,
      w: Math.max(...xs) - Math.min(...xs) + pad * 2,
      h: Math.max(...ys) - Math.min(...ys) + pad * 2,
    };
    this.aspect.set(this.home.w / this.home.h);
    this.view.set({ ...this.home });
  }

  // Zoom hacia un punto (en coordenadas del mapa), para que el punto bajo el cursor no se mueva
  private zoomAt(factor: number, mx: number, my: number) {
    const v = this.view();
    const w = Math.min(Math.max(v.w * factor, this.home.w * 0.02), this.home.w * 1.5);
    const k = w / v.w;
    this.view.set({
      x: mx - (mx - v.x) * k,
      y: my - (my - v.y) * k,
      w,
      h: v.h * k,
    });
  }

  onWheel(e: WheelEvent, svg: Element) {
    e.preventDefault();
    const rect = svg.getBoundingClientRect();
    const v = this.view();
    const mx = v.x + ((e.clientX - rect.left) / rect.width) * v.w;
    const my = v.y + ((e.clientY - rect.top) / rect.height) * v.h;
    this.zoomAt(e.deltaY > 0 ? 1.15 : 1 / 1.15, mx, my);
  }

  zoomIn()  { const v = this.view(); this.zoomAt(1 / 1.4, v.x + v.w / 2, v.y + v.h / 2); }
  zoomOut() { const v = this.view(); this.zoomAt(1.4, v.x + v.w / 2, v.y + v.h / 2); }
  reset()   { this.view.set({ ...this.home }); }

  onPointerDown(e: PointerEvent) {
    this.dragging = true;
    this.dragDist = 0;
    this.last = { x: e.clientX, y: e.clientY };
  }

  onPointerMove(e: PointerEvent, svg: Element) {
    if (!this.dragging) return;
    const dx = e.clientX - this.last.x;
    const dy = e.clientY - this.last.y;
    this.last = { x: e.clientX, y: e.clientY };
    this.dragDist += Math.abs(dx) + Math.abs(dy);

    const rect = svg.getBoundingClientRect();
    const v = this.view();
    this.view.set({
      ...v,
      x: v.x - (dx / rect.width) * v.w,
      y: v.y - (dy / rect.height) * v.h,
    });
  }

  onPointerUp() { this.dragging = false; }

  select(p: any) {
    if (this.dragDist > 4) return; // fue un arrastre, no un clic
    this.selected.set(p);
  }

  ownerColor(owner: string) {
    const colors: Record<string, string> = {
      Humans: '#4da6ff', Terminids: '#ffb020', Automaton: '#ff4d4d', Illuminate: '#b266ff',
    };
    return colors[owner] ?? '#888';
  }

  label(v: any): string {
    return typeof v === 'string' ? v : v?.en ?? '';
  }
}