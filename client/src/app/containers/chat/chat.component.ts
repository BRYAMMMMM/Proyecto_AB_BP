import { CommonModule } from "@angular/common";
import { UserComponent } from "../../components/user/user.component";
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [UserComponent, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  userName: string = '';
    message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;

  constructor() { }

  userNameUpdate(name: string): void {
    this.socket = io.io(`localhost:3000?userName=${name}`);
    this.userName = name;

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
      }
    });
  }

  sendMessage(): void {
    if (this.socket) { // Verifica que el socket esté definido
      this.socket.emit('message', this.message);
      this.messageList.push({message: this.message, userName: this.userName, mine: true});
      this.message = '';
    } else {
      console.error('Socket no está inicializado. Asegúrate de haber configurado el nombre de usuario.');
    }
  }
  

}