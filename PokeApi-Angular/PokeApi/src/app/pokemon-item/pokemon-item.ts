import { Component, EventEmitter, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonList } from '../pages/pokemon-list/pokemon-list';
import { CommonModule } from '@angular/common';
import { PokeApi } from '../core/services/poke-api';
import { Router } from '@angular/router';
import { Header } from "../header/header";
import { GetImage } from "../get-image/get-image";

@Component({
  selector: 'app-pokemon-item',
  imports: [CommonModule, Header, GetImage],
  templateUrl: './pokemon-item.html',
  styleUrl: './pokemon-item.scss'
})


export class PokemonItem implements OnChanges {
  //omo data es de tipo Pokemon, ahora puedes usar data.name, data.url, data.types, todo gracias a la interfaz
  @Input() data?: Pokemon; //Aquí declaramos que podemos recibir datos desde el padre y que esa data hereda una interfaz
  id: string = '0';
  idImage: string = '0';
  





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
      this.idImage = this.id;
      //regresa toda la data con esa ID
      this.data = await this.pokeApi.getById(this.id);
      console.log("Tipos:", this.data?.types);
    }
  }
}

  