import { Component, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokeApi } from '../core/services/poke-api';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchBar } from '../search-bar/search-bar';


@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule, SearchBar],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss'
})
export class PokemonDetail {
  //pasame la informacion de data por la interfaz pokemon y ahora con data podemos usar la informacion que hay ahi 
  @Input() data?: Pokemon;

  //la ! le dice a ts que asignara un valor, pero que en su inicio no tiene nada, no esta inicializada
  id!: string | null;

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
      this.data = await this.pokeApi.getById(this.id);
      console.log('Pokemon cargado:', this.data);
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
