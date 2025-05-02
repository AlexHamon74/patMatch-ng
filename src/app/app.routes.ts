import { Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/guest/auth/auth.component';
import { LoginComponent } from './views/guest/login/login.component';
import { RegisterComponent } from './views/guest/register/register.component';
import { HomeComponent } from './views/guest/home/home.component';
import { GeneralInformationCustomerComponent } from './views/guest/register/registerMore/customer/general-information/general-information.component';
import { GeneralInformationBreederComponent } from './views/guest/register/registerMore/breeder/general-information/general-information.component';
import { ContactDetailsComponent } from './views/guest/register/registerMore/breeder/contact-details/contact-details.component';
import { PresentationComponent } from './views/guest/register/registerMore/breeder/presentation/presentation.component';
import { CertificationComponent } from './views/guest/register/registerMore/breeder/certification/certification.component';
import { HousingInformationComponent } from './views/guest/register/registerMore/customer/housing-information/housing-information.component';
import { BreederListComponent } from './views/guest/breeder-list/breeder-list.component';
import { BreederDetailsComponent } from './views/guest/breeder-details/breeder-details.component';
import { MatchsComponent } from './views/user/matchs/matchs.component';
import { BlogComponent } from './views/guest/blog/blog.component';
import { AnimalDetailsComponent } from './views/guest/animal-details/animal-details.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: AuthComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'home', component: HomeComponent },
            { path: 'animalDetails', component: AnimalDetailsComponent },
            { path: 'breederList', component: BreederListComponent },
            { path: 'breederList/breederDetails', component: BreederDetailsComponent },
            { path: 'matchs', component: MatchsComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'register/customer/generalInformation', component: GeneralInformationCustomerComponent },
            { path: 'register/customer/housingInformation', component: HousingInformationComponent },
            { path: 'register/breeder/generalInformation', component: GeneralInformationBreederComponent },
            { path: 'register/breeder/contactDetails', component: ContactDetailsComponent },
            { path: 'register/breeder/presentation', component: PresentationComponent },
            { path: 'register/breeder/certification', component: CertificationComponent },
        ]
    },


    // TODO : Page 404
    {path:'**', redirectTo:'/' },
];
