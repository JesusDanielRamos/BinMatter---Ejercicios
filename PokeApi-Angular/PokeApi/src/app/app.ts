import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { SearchBar } from './search-bar/search-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.html', //aqui esta enlazado el html de la app
  styleUrl: './app.scss', 
  //aqui agregamos los componentes que habra dentro de este componente
  //el nombre de este no es el selector sino el nombre de la clase del componente
  imports: [Header, RouterOutlet, SearchBar]
})

export class App {
  protected readonly title = signal('PokeApi');
  Title = "Pokédex";
  Content = "Una guía sencilla para encontrar todos los pokemones! Información sacada de la PokeApi, busca todos los pokemones!!";
}
