import { Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { AuthComponent } from './views/guest/auth/auth.component';
import { LoginComponent } from './views/guest/login/login.component';
import { RegisterComponent } from './views/guest/register/register.component';
import { HomeComponent } from './views/guest/home/home.component';
import { GeneralInformationCustomerComponent } from './views/guest/register/registerMore/customer/general-information/general-information.component';
import { HousingInformationComponent } from './views/guest/register/registerMore/customer/housing-information/housing-information.component';
import { BreederListComponent } from './views/guest/breeder-list/breeder-list.component';
import { BreederDetailsComponent } from './views/guest/breeder-details/breeder-details.component';
import { MatchsComponent } from './views/user/matchs/matchs.component';
import { BlogComponent } from './views/guest/blog/blog.component';
import { AnimalDetailsComponent } from './views/guest/animal-details/animal-details.component';
import { ProfilComponent } from './views/user/profil/profil.component';
import { HouseholdInformationComponent } from './views/guest/register/registerMore/customer/household-information/houshold-information.component';
import { AdoptionPreferencesComponent } from './views/guest/register/registerMore/customer/adoption-preferences/adoption-preferences.component';
import { EngagementComponent } from './views/guest/register/registerMore/customer/engagement/engagement.component';

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
            { path: 'profil', component: ProfilComponent },
            { path: 'register/customer/generalInformation', component: GeneralInformationCustomerComponent },
            { path: 'register/customer/housingInformation', component: HousingInformationComponent },
            { path: 'register/customer/householdInformation', component: HouseholdInformationComponent },
            { path: 'register/customer/adoptionPreferences', component: AdoptionPreferencesComponent },
            { path: 'register/customer/engagement', component: EngagementComponent },
        ]
    },

    // TODO : Page 404
    {path:'**', redirectTo:'/' },
];
