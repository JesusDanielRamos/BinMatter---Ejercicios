import { Component, EventEmitter, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { CommonModule } from '@angular/common';
import { PokeApi } from '../core/services/poke-api';
import { Router } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-pokemon-item',
  imports: [CommonModule, Header],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss'
})


export class PokemonItem implements OnChanges {
  //omo data es de tipo Pokemon, ahora puedes usar data.name, data.url, data.types, todo gracias a la interfaz
  @Input() data?: Pokemon; //Aquí declaramos que podemos recibir datos desde el padre y que esa data hereda una interfaz
  id: string = '0';

  

getColorType(type: string) {
  //Diccionario donde la clave es string y el valor es string
  const colores: { [color: string]: string } = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    steel: '#B8B8D0',
    ice: '#a6dfdfff',
    flying: '#A890F0'
  };

  return colores[type] || 'gray';
}

getColorImage(type: string) : string {
  const colores: { [key: string]: string } = {
    grass: '#8af6ceff',
    fire: '#ee904cff',
    water: '#7596e5ff',
    bug: '#c8d647ff',
    normal: '#a2a25cff',
    poison: '#bc63bcff',
    electric: '#f4d557ff',
    ground: '#E0C068',
    fairy: '#bd8793ff',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#746390ff',
    ice: '#a6dfdfff',
    steel: '#B8B8D0',
  };
  return colores[type] || 'gray';
}

getTypeOfColorImage() : string{
  if (this.data?.types && this.data.types.length > 0) {
    return this.getColorImage(this.data.types[0].type.name);
  }
  return 'gray'; // color por defecto si no hay tipos
}






  //creamos el constructor para poder acceder al servicio y sus metodos
  //se puede cambiar a inject, nueva forma en nuevo angular 
  constructor(private  pokeApi:PokeApi, private router: Router){}

  //on changes es una interfaz que funciona cada cuando haya un cambio 
  ngOnChanges(): void {
    this.extraerInformacion()
    
  }

 
//id puede ser un numero o string 
//una vez entramos a este metodo nos manda a el componente detalle,
  goToDetail(id: number | string) {
    this.router.navigate(['/pokemon', id]);
     console.log('Navegando al detalle de:', id); 
  }

  
  async extraerInformacion() {
    if(this.data){
      //genera el ID
      this.id = this.data.url.substring(34, this.data.url.length-1)
      //regresa toda la data con esa ID
      this.data = await this.pokeApi.getById(this.id);
      console.log("Tipos:", this.data?.types);
      
    }
  }
}

  