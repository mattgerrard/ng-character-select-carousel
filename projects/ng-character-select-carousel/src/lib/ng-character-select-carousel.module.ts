import { NgModule } from '@angular/core';
import { NgCharacterSelectCarouselComponent } from './ng-character-select-carousel.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';



@NgModule({
  declarations: [NgCharacterSelectCarouselComponent],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [NgCharacterSelectCarouselComponent]
})
export class NgCharacterSelectCarouselModule { }
