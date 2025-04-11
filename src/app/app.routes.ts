import { Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/user/auth/auth.component';
import { LoginComponent } from './views/user/login/login.component';
import { RegisterComponent } from './views/user/register/register.component';
import { HomeComponent } from './views/user/home/home.component';
import { GeneralInformationComponent } from './views/user/register/registerMore/breeder/general-information/general-information.component';
import { ContactDetailsComponent } from './views/user/register/registerMore/breeder/contact-details/contact-details.component';
import { PresentationComponent } from './views/user/register/registerMore/breeder/presentation/presentation.component';
import { CertificationComponent } from './views/user/register/registerMore/breeder/certification/certification.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: AuthComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'home', component: HomeComponent },
            { path: 'register/breeder/generalInformation', component: GeneralInformationComponent },
            { path: 'register/breeder/contactDetails', component: ContactDetailsComponent },
            { path: 'register/breeder/presentation', component: PresentationComponent },
            { path: 'register/breeder/certification', component: CertificationComponent },
        ]
    },


    // TODO : Page 404
    {path:'**', redirectTo:'/' },
];
