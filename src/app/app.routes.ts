import { Routes } from '@angular/router';
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
import { GeneralInformationBreederComponent } from './views/guest/register/registerMore/breeder/general-information-breeder/general-information.component-breeder';
import { ContactDetailsComponent } from './views/guest/register/registerMore/breeder/contact-details/contact-details.component';
import { praticalInformationPart1Component } from './views/guest/register/registerMore/breeder/pratical-information-part1/pratical-information-part1.component';
import { praticalInformationPart2Component } from './views/guest/register/registerMore/breeder/pratical-information-part2/pratical-information-part2.component';
import { EngagementBreederComponent } from './views/guest/register/registerMore/breeder/engagement-breeder/engagement-breeder.component';
import { DashboardComponent } from './views/breeder/dashboard/dashboard.component';
import { AnimalsListComponent } from './views/breeder/animals-list/animals-list.component';
import { GeneralInformationComponent } from './views/breeder/add-animal/general-information/general-information.component';
import { HealthComponent } from './views/breeder/add-animal/health/health.component';
import { PersonalityComponent } from './views/breeder/add-animal/personality/personality.component';
import { IdealEnvironmentComponent } from './views/breeder/add-animal/ideal-environment/ideal-environment.component';
import { TermsComponent } from './views/breeder/add-animal/terms/terms.component';
import { PicturesComponent } from './views/breeder/add-animal/pictures/pictures.component';
import { AuthUserGuard } from './core/guards/auth-user.guards';
import { AuthBreederGuard } from './core/guards/auth-breeder.guards';

export const routes: Routes = [
    {
        path: '',
        children: [
            // Routes publiques
            { path: '', component: AuthComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'home', component: HomeComponent },
            { path: 'animalDetails', component: AnimalDetailsComponent },
            { path: 'breederList', component: BreederListComponent },
            { path: 'breederList/:id', component: BreederDetailsComponent },
            { path: 'blog', component: BlogComponent },

            { path: 'register/customer/generalInformation', component: GeneralInformationCustomerComponent },
            { path: 'register/customer/housingInformation', component: HousingInformationComponent },
            { path: 'register/customer/householdInformation', component: HouseholdInformationComponent },
            { path: 'register/customer/adoptionPreferences', component: AdoptionPreferencesComponent },
            { path: 'register/customer/engagement', component: EngagementComponent },

            { path: 'register/breeder/generalInformationBreeder', component: GeneralInformationBreederComponent },
            { path: 'register/breeder/contactDetails', component: ContactDetailsComponent },
            { path: 'register/breeder/praticalInformationPart1', component: praticalInformationPart1Component },
            { path: 'register/breeder/praticalInformationPart2', component: praticalInformationPart2Component },
            { path: 'register/breeder/engagementBreeder', component: EngagementBreederComponent },

            // TODO : Page 403
            {path: 'unauthorized', redirectTo: '/'},

            // Routes protégées pour les utilisateurs connectés
            { path: 'matchs', component: MatchsComponent, canActivate: [AuthUserGuard] },
            { path: 'profil', component: ProfilComponent, canActivate: [AuthUserGuard] },
        ]
    },
    {
        path: 'breeder',
        children: [
            // Routes protégées pour les éleveurs connectés
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthBreederGuard] },
            { path: 'animalsList', component: AnimalsListComponent, canActivate: [AuthBreederGuard] },
            { path: 'addAnimal/generalInformation', component: GeneralInformationComponent, canActivate: [AuthBreederGuard] },
            { path: 'addAnimal/health', component: HealthComponent, canActivate: [AuthBreederGuard] },
            { path: 'addAnimal/personality', component: PersonalityComponent, canActivate: [AuthBreederGuard] },
            { path: 'addAnimal/idealEnvironment', component: IdealEnvironmentComponent, canActivate: [AuthBreederGuard] },
            { path: 'addAnimal/terms', component: TermsComponent, canActivate: [AuthBreederGuard] },
            { path: 'addAnimal/pictures', component: PicturesComponent, canActivate: [AuthBreederGuard] },
        ]
    },

    // TODO : Page 404
    {path:'**', redirectTo: '/' },
];
