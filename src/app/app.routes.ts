import { HomeComponent } from './sposhu/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './sposhu/selector/selector.component';
import { ShufflerComponent } from './sposhu/shuffler/shuffler.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'artists', component: SelectorComponent, data: { type: 'artists' } },
    { path: 'audiobooks', component: SelectorComponent, data: { type: 'audiobooks' } },
    { path: 'artist/:id', component: ShufflerComponent, data: { type: 'artists' } },
    { path: 'audiobook/:id', component: ShufflerComponent, data: { type: 'audiobooks' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }