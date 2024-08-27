import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ArtistComponent } from './artist/artist.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SelectorComponent } from './selector/selector.component';


@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        ArtistComponent,
        SelectorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
