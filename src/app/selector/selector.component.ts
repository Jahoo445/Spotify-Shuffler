import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Artist } from '../types/artists.type';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent implements OnInit {

  artists: Artist[] = [
    { id: '3meJIgRw7YleJrmbpbJK6S', artistName: 'Die Drie ???' },
    { id: '61qDotnjM0jnY5lkfOP7ve', artistName: 'TKKG' },
  ];

  selectedArtist: Artist = this.artists[0];

  type: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.type = data['type'];
      if (this.type === 'artists') {
        // Initialize as artist
        console.log('Component initialized as Artist');
      } else if (this.type === 'audiobooks') {
        // Initialize as audiobook
        console.log('Component initialized as Audiobook');
      }
    });
  }
}
