import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }



  private ejecutarQuery<T>(query: string){
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    // console.log(query);

    return this.http.get<T>(query);
  }


  getPopulares(){

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }


  getFeature(){
    // Aca obtengo la fecha del dia
    const hoy = new Date();
    // Y aca tengo la fecha del utlimo dia del mes porque agrego 1 
    // al mes actual pero con 0 indico esto
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    // se le suma 1 al mes actual porque esto esta en base a 0
    const mes = hoy.getMonth() + 1;

    let mesString;

    if (mes < 10){
      // Aqui lo paso a string porque si sumo un numero con un string
      // el numero es tomado como si fuera string
        mesString = '0' + mes;
    }else{
        mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);

  }


  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }



  getActoresPelicula(id: string){
    // ?a=1 no hace nada simplemente es como si estuvieramos agregando un
    // valor adicional para que la query funcione bien
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }



  buscarPeliculas(movie: string){

    return this.ejecutarQuery(`/search/movie?query=${movie}`);

  }


  cargarGeneros(): Promise<Genre[]>{

    return new Promise( resolve => {
      // ?a=1 es porque cuando le concateno el apikey quede bien la url
      this.ejecutarQuery(`/genre/movie/list?a=1`)
          .subscribe( res => {
            this.generos = res['genres'];
            // console.log(this.generos);
            resolve(this.generos);
          });
    });

  }



}
