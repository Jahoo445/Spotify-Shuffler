import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SelectorComponent } from './sposhu/selector/selector.component';
import { HomeComponent } from './sposhu/home/home.component';
import { ShufflerComponent } from './sposhu/shuffler/shuffler.component';
import { FooterComponent } from './sposhu/components/footer/footer.component';


@NgModule({
    declarations: [
        AppComponent,
        SelectorComponent,
        HomeComponent,
        ShufflerComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        MatSelectModule,
        MatOptionModule,
        FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
