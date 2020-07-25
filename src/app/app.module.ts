import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgCharacterSelectCarouselModule} from 'ng-character-select-carousel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCharacterSelectCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
