import { Component, inject, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { PokeApi } from '../core/services/poke-api';


@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.scss'
})


export class Stats {
  @Input() data?: Pokemon;
   //la ! le dice a ts que asignara un valor, pero que en su inicio no tiene nada, no esta inicializada
  @Input() id!: string | null;
  
  description: string = ""; //variable para almacenar la descripción del pokemon

  evolution: any[] = []; //un array para almacenar las evoluciones,
  //  es any porque no sabemos que tipo de datos va a traer, puede ser string, number, objeto, etc
  selectedTab: string = 'forms'; // por defecto mostrar stats

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  
  
  constructor(
    private route: ActivatedRoute,
    private pokeApi: PokeApi,
    private location: Location,
    private router: Router
  ) {}


  

  goToPokemon(id: number | string) {
    this.router.navigate(['/pokemon', id]);
     console.log('Navegando al detalle de:', id); 
  }

async ngOnInit() {
  this.route.paramMap.subscribe(async params => {
    this.id = params.get('id');
    if (this.id) {
      // Llamamos a la API usando el servicio
      this.data = await this.pokeApi.getById(this.id);
     // console.log('Pokemon cargado en stats:', this.data);

      this.pokeApi.getDescription(this.id).subscribe(description => {
        this.description = description;
      });

      this.pokeApi.getEvolutions(this.id).subscribe(evolution => {
        //console.log('Evolución cargada:', evolution);
        this.evolution = evolution;
      });
    }
  });
}




   

}
