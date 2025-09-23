import { Component, EventEmitter, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { CommonModule } from '@angular/common';
import { PokeApi } from '../core/services/poke-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-item',
  imports: [CommonModule],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss'
})


export class PokemonItem implements OnChanges {
  @Input() data?: Pokemon;
  id: string = '0';
  
  //creamos el constructor para poder acceder al servicio y sus metodos
  constructor(private  pokeApi:PokeApi, private router: Router){}

  //on changes es una interfaz que funciona cada cuando haya un cambio 
  ngOnChanges(): void {
    this.extraerInformacion()
  }

 

  goToDetail(id: number | string) {
    this.router.navigate(['/pokemon', id]);
     console.log('Navegando al detalle de:', id); 
  }

  async extraerInformacion() {
    if(this.data){
      this.id = this.data.url.substring(34, this.data.url.length-1)
      this.data = await this.pokeApi.getById(this.id);
    }
  }
}

  