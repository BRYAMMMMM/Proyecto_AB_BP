import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ChatComponent } from './containers/chat/chat.component';

export const routes: Routes = [
    { path: 'chat', component: ChatComponent },
    { path: 'user', component: UserComponent }
];
