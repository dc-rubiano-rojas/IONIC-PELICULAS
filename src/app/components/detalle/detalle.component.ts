import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  existe: boolean;

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  async ngOnInit() {
    // console.log('id', this.id);
    this.existe = await this.dataLocal.existePelicula(this.id);
    console.log('Detalle Component existe!', this.existe);

    this.moviesService.getPeliculaDetalle(this.id)
        .subscribe( res => {
          console.log(res);
          this.pelicula = res;
        });

    this.moviesService.getActoresPelicula(this.id)
        .subscribe( res => {
          console.log(res);
          this.actores = res.cast;
        });
  }

  regresar(){
    this.modalCtrl.dismiss();

  }


  async favorito(){
    this.dataLocal.guardarPelicula(this.pelicula);

    this.existe = (this.existe ? false : true);

  }
}
