import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PokeApi } from '../../core/services/poke-api';
import { catchError, finalize, Observable } from 'rxjs';
import { Pokemon, PokemonResults } from '../../interfaces/pokemon';
import { PokemonItem } from '../../pokemon-item/pokemon-item';
import { SearchBar } from '../../search-bar/search-bar';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe,PokemonList, PokemonItem, CommonModule, SearchBar],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})


export class PokemonList implements OnInit{
  Title = "Pokédex";
  Content = "Una guía sencilla para encontrar todos los pokemones! Información sacada de la PokeApi, busca todos los pokemones!!";

  private pokeApi = inject(PokeApi);
  listaPokemon : Pokemon[] = [];

  //metodo que se llama cuando inicia la aplicacion 
  ngOnInit(): void {
      this.cargarLista();
  }

  async cargarLista(){

  this.pokeApi.getByPage().subscribe(d => { //te permite poder acceder lo que retorna la funcion que contiene el observable
    console.log(d + "lista cargada y suscrito");
     this.listaPokemon =   [...this.listaPokemon, ...d];
  })
 
    // 
    // console.log(this.listaPokemon);
  }
  
}
