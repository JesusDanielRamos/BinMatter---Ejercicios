import { Component, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokeApi } from '../core/services/poke-api';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss'
})
export class PokemonDetail {
  @Input() data?: Pokemon;
  
  
  id!: string | null;
  pokemon: any; // puedes luego tiparlo con tu interfaz Pokemon

  constructor(
    private route: ActivatedRoute,
    private pokeApi: PokeApi,
    private location: Location,
    private router: Router
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // Llamamos a la API usando el servicio
      this.pokemon = await this.pokeApi.getById(this.id);
      console.log('Pokemon cargado:', this.pokemon);
    }
  }
 
  goBack() {
    console.log('goBack click. history.length =', window.history.length);
    // Si hay historial, volvemos atrás; si no, vamos al home (lista)
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

}
