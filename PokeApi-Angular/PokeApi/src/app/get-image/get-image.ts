import { Component, inject, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokeApi } from '../core/services/poke-api';

@Component({
  selector: 'app-get-image',
  imports: [],
  templateUrl: './get-image.html',
  styleUrl: './get-image.scss'
})
export class GetImage {
@Input() data?: Pokemon; //Aquí declaramos que podemos recibir datos desde el padre y que esa data hereda una interfaz
@Input() id!: string | null;
idImage: string = '0';
constructor(private  pokeApi:PokeApi){}



ngOnChanges(): void {
    this.extraerInformacion()
    console.log("ID imagen en get-image:" + this.id);
}

async extraerInformacion() {
    if(this.data){
      //genera el ID
      this.idImage = this.data.url.toString();
      console.log("ID imagen:", this.idImage);
    }
  }


}
