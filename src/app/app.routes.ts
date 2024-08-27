import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';
import { ShufflerComponent } from './shuffler/shuffler.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'artists', component: SelectorComponent, data: { type: 'artists' } },
    { path: 'audiobooks', component: SelectorComponent, data: { type: 'audiobooks' } },
    { path: 'artist/:id', component: ShufflerComponent, data: { type: 'artists' } },
    { path: 'audioBook/:id', component: ShufflerComponent, data: { type: 'audiobooks' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }