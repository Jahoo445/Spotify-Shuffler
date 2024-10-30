import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';
import { ShufflerComponent } from './shuffler/shuffler.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'artists', component: SelectorComponent, data: { type: 'artists' } },
    { path: 'audiobooks', component: SelectorComponent, data: { type: 'audiobooks' } },
    { path: 'artist/:id', component: ShufflerComponent, data: { type: 'artists' } },
    { path: 'audiobook/:id', component: ShufflerComponent, data: { type: 'audiobooks' } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }