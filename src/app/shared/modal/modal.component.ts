import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Titre de la modal';
  @Input() content: string = 'Contenu de la modal';
  @Input() isOpen: boolean = false;
  
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<number>();

  quantity: number = 1;

  constructor() {
  }

  closeModal() {
    this.quantity = 1;
    this.close.emit();
  }

  confirmAction() {
    this.confirm.emit(this.quantity);
    this.quantity = 1;
  }

  validateNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); 
  }
}
