import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor( private dataLocalService: DataLocalService,
               private moviesService: MoviesService ) {}


  // Esto ionic lo activa cada vez que la pagina entra
  ionViewWillEnter(){
    this.cargarDatos(true);
  }

  async cargarDatos(event){

    if (event){
      this.peliculas = await this.dataLocalService.cargarFavoritos();
      this.generos = await this.moviesService.cargarGeneros();

      this.pelisPorGenero(this.generos, this.peliculas);
    }

  }



  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]){

    this.favoritoGenero = [];

    generos.forEach( genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
                return peli.genres.find( genre => genre.id === genero.id);
        })
      });

    });

    console.log(this.favoritoGenero);

  }



}
