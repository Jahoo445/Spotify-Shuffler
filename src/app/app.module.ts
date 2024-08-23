import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ArtistComponent } from './artist/artist.component';
import { AppRoutingModule } from './app.routes';


@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        ArtistComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
