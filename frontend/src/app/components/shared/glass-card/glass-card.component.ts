import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="glass-panel card-hover-effect animate-fade-in-up"
      [class]="customClass"
      [style.padding]="padding"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class GlassCardComponent {
  @Input() padding: string = '1.5rem';
  @Input() customClass: string = '';
}
