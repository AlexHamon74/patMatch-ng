import { Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/user/auth/auth.component';
import { LoginComponent } from './views/user/login/login.component';
import { RegisterComponent } from './views/user/register/register.component';
import { HomeComponent } from './views/user/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: AuthComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'home', component: HomeComponent },
        ]
    },


    // TODO : Page 404
    {path:'**', redirectTo:'/' },
];
