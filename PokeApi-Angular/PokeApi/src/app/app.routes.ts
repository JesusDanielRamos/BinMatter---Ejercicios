import { Routes } from '@angular/router';
//aqui importamos nuestro componente, referenciarlo aqui sirve si queremos usar el <router-otulet>
import { App } from './app';
import { PokemonDetail } from './pokemon-detail/pokemon-detail';
import { PokemonList } from './pages/pokemon-list/pokemon-list';


//arreglo vacio de rutas
export const routes: Routes = [

  { path: '', component: PokemonList },           // Home  lista de Pokémon
  { path: 'pokemon/:id', component: PokemonDetail }, // lo que esta entre comillas es el nombre designado, y el segundo nuestro componente deseado a navegar
  {
    path: '**',            //  ruta "catch-all" (404)
    redirectTo: ''         // redirige a home, o crea un PageNotFoundComponent
  }
    
];

//digamos si estuvieramos en la ruta 404 mostraria el componente Page not found 