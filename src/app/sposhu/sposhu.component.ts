import { Component, OnInit, inject } from '@angular/core';
// import { ArtMakerService } from '../../services/artists.service';
// import { FirebaseArtistsService } from '../../services/firebase-artists.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-sposu',
    templateUrl: './sposhu.component.html',
    styleUrl: './sposhu.component.scss',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, RouterLink,],
})

export class SposhuComponent implements OnInit {
    routeLink: string = '/login'

    ngOnInit(): void {

    }

    // artMakerService = inject(ArtMakerService);
    // firebaseArtistsService = inject(FirebaseArtistsService);

    // ngOnInit(): void {
    //     this.firebaseArtistsService.getArtists().subscribe((artists) => {
    //         this.artMakerService.artistSig.set(artists);
    //     });

    //     this.firebaseArtistsService.getAudioBooks().subscribe((audioBooks) => {
    //         this.artMakerService.audioBookSig.set(audioBooks);
    //     });
    // }
}
