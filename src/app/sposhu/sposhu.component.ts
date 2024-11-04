import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-sposhu',
    templateUrl: './sposhu.component.html',
    styleUrl: './sposhu.component.scss',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, RouterLink,],
})

export class SposhuComponent {
    routeLink: string = '/login';
}