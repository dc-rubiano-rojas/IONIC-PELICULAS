import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() reLoad = new EventEmitter();

  slideOpts = {
    // El slidesPerView hace que se muestre el slide
    // y un pedazo del otro
    slidesPerView: 3.4,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    // Esto es una promesa que esta escuchando cuando el modal se cierra
    modal.onDidDismiss().then(data => {
      this.reLoad.emit(true);
    });

    return await modal.present();
  }

}
