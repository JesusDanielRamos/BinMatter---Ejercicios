import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})

export class SearchBar {
  
  constructor(private router: Router){}
  searchTerm: string = '';
  

  searchPokemon() {
    if (this.searchTerm.trim() !== '' ) {
      this.router.navigate(['/pokemon', this.searchTerm.toLowerCase()]);
    }
  }
}
