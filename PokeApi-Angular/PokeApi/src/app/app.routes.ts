import { Routes } from '@angular/router';
//aqui importamos nuestro componente, referenciarlo aqui sirve si queremos usar el <router-otulet>
import { App } from './app';


//arreglo vacio de rutas
export const routes: Routes = [

    {path: '',
     component: App
    }
    
];

//digamos si estuvieramos en la ruta 404 mostraria el componente Page not found 