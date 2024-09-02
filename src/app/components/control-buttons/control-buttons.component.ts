import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-control-buttons',
  standalone: true,
  imports: [],
  templateUrl: './control-buttons.component.html',
  styleUrl: './control-buttons.component.scss'
})

export class ControlButtonsComponent {
  @Output() back = new EventEmitter<void>();
  @Output() play = new EventEmitter<void>();
  @Output() forward = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  onPlay() {
    this.play.emit();
  }

  onForward() {
    this.forward.emit();
  }
}


