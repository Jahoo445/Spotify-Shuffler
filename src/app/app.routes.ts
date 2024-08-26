import { ArtistComponent } from './artist/artist.component';
import { AudiobooksComponent } from './audiobooks/audiobooks.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'artists', component: SelectorComponent },
    { path: 'audiobooks', component: SelectorComponent },
    { path: 'artist/:id', component: ArtistComponent },
    { path: 'player/:id', component: PlayerComponent },
    { path: 'audioBook/:id', component: AudiobooksComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }