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
   getByPage() {
    //map permite filtrar 
      return this.http.get("https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0").pipe(map((respuestaJson: any) => {
        console.log(respuestaJson)
        return respuestaJson.results;
      }));
  }

  //con este metodo podemos acceder al ID de cada pokemon
  async getById(id:string){
    
    const resultadoApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      //lee el JSON de la respuesta del backend
      const apiJson = await resultadoApi.json();
      console.log(apiJson + "pokemon por ID") ;

      // const api2 = this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      // console.log(api2 + "api2");
      return apiJson;
  }
  
}
