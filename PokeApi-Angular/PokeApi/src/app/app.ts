import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { SearchBar } from './search-bar/search-bar';
import { PokemonList } from "./pages/pokemon-list/pokemon-list";
import { PokemonItem } from './pokemon-item/pokemon-item';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html', //aqui esta enlazado el html de la app
  styleUrl: './app.scss', 
  //aqui agregamos los componentes que habra dentro de este componente
  //el nombre de este no es el selector sino el nombre de la clase del componente
  imports: [Header, RouterOutlet, SearchBar, PokemonList, PokemonItem]
})

export class App {
  protected readonly title = signal('PokeApi');
}
