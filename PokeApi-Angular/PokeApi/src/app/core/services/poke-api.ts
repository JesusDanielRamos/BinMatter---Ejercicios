import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonResults } from '../../interfaces/pokemon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApi {
  
  constructor(private http: HttpClient){}

  getPokemonList(): Observable<PokemonResults>{
    return this.http.get<PokemonResults>(` https://pokeapi.co/api/v2/pokemon?limit=60&offset=60`);
  }

}
