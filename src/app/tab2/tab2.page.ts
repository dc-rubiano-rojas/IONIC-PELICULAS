import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Tenet', 'Avangers', 'Black Panter', 'El señor de los anillos'];

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController) {}

  buscar(event){
    const valor: string = event.detail.value;

    if (valor.length === 0){
      this.peliculas = [];
      return;
    }

    // console.log(event);
    this.buscando = true;
    this.moviesService.buscarPeliculas(valor)
        .subscribe(res => {
          // console.log(res);
          this.peliculas = res['results'];
          this.buscando = false;
        });
  }


  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    return await modal.present();
  }



}
