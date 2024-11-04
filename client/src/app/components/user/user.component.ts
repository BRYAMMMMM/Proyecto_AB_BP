
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userName: string = '';
  @Output() userNameUpdate = new EventEmitter<string>();

  constructor() { }

  setUserName(): void {
    if (this.userName) {
      this.userNameUpdate.emit(this.userName); // Emitir el nombre de usuario como string
    }

}
}