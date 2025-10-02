import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
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
        return respuestaJson.results;
      }));
  }

  //metodo para obtener id 
  async getId(url:string){
    //substring extrae una parte de un string, en este caso el ID del pokemon
    const id = url.substring(34, url.length-1)
    return id;
  }

  //con este metodo podemos acceder al ID de cada pokemon
  async getById(id:string  ){
    const resultadoApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      //lee el JSON de la r espuesta del backend
      const apiJson = await resultadoApi.json();
      return apiJson;
  }




  getDescription(id:string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).pipe(map((respuestaJson: any) => {
      console.log(respuestaJson + "descripcion");
      return respuestaJson.flavor_text_entries.find((entry: any) => entry.language.name === 'es')?.flavor_text || "Descripción no disponible en español.";
    }));
  }



  getEvolutions(id: string): Observable<any[]> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      // Paso 1: obtener species
      switchMap(pokemon => this.http.get<any>(pokemon.species.url)),
      // Paso 2: obtener evolution_chain
      switchMap(species => this.http.get<any>(species.evolution_chain.url)),
      // Paso 3: recorrer la cadena y extraer nombres
      map(evoData => this.parseEvolutionChain(evoData.chain)),
      // Paso 4: traer imágenes de cada nombre
      switchMap(names => {
        const requests = names.map((name: string) =>
          this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
            map(p => ({
              id: p.id,
              name: p.name,
              image: p.sprites.front_default
            }))
          )
        );
        return forkJoin(requests);
      })
    );
  }

  // Función recursiva para recorrer la cadena
  private parseEvolutionChain(chain: any): string[] {
    const evolutions: string[] = [];
    evolutions.push(chain.species.name);
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((e: any) => {
        evolutions.push(...this.parseEvolutionChain(e));
      });
    }
    return evolutions;
  }



  
  
}
