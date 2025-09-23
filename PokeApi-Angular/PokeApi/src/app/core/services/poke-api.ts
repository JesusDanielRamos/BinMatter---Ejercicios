import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonResults } from '../../interfaces/pokemon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApi {

 //inject es la nueva forma de acceder a archivos en lugar de hacer un constructor 
  private http = inject(HttpClient);
  // constructor(private http: HttpClient){}

  //funciones asincrona que devuelve una promesa que cuando se resuelva regresa un tipo de dato Pokemon de nuestra interfaz 
   getByPage() {
    //map permite filtrar 
      return this.http.get("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0").pipe(map((d: any) => {
console.log(d)
        return d.results;
      }));
      // const resultadoApi = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0");
      // //lee el JSON de la respuesta del backend
      // const apiJson = await resultadoApi.json();
      // if(apiJson.results.length > 0) return apiJson.results
      // return [];
  }

  //con este metodo podemos acceder al ID de cada pokemon
  async getById(id:string){
    const resultadoApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      //lee el JSON de la respuesta del backend
      const apiJson = await resultadoApi.json();
      console.log(apiJson);
      return apiJson;
  }
  
}
