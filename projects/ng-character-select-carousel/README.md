# NgCharacterSelectCarouselModule

* A spinning character select carousel supporting 3 characters. Powered by [gsap](https://greensock.com).
* Library location: `projects/ng-character-select-carousel` directory of this repository.

![Example carousel](https://github.com/matthewgerrard/ng-character-select-carousel/raw/master/example.gif)

## Examples/Demo

* An example can be found under `src/app` directory of this repository.

## Installation

`npm i ng-character-select-carousel`

## API

`import {NgCharacterSelectCarouselModule} from 'ng-character-select-carousel';`<br>
`selector: ng-character-select-carousel`

### @Inputs()

| Input            | Type                   | Required                         | Description                                                     |
| ---------------- | ---------------------- | -------------------------------- | --------------------------------------------------------------- |
| image1Url        | string                 | Optional, default: sample image  | Url to character 1 image. If blank a sample image is used       |
| image1MaskUrl    | string                 | Optional, default: sample image  | Url to character 1 image mask . If blank a sample image is used | 
| image2Url        | string                 | Optional, default: sample image  | Url to character 2 image. If blank a sample image is used       |
| image2MaskUrl    | string                 | Optional, default: sample image  | Url to character 2 image mask . If blank a sample image is used |
| image2Url        | string                 | Optional, default: sample image  | Url to character 3 image. If blank a sample image is used       |
| image2MaskUrl    | string                 | Optional, default: sample image  | Url to character 3 image mask . If blank a sample image is used |
| spins            | Observable<Direction>  | Optional                         | For submitting left/right spin events.                          |

### @Outputs()

| Output           | Type       | Required | Description                               |
| ---------------- | ---------- | -------- | ----------------------------------------- |
| selectedAvatar   | number     | No       | emits the index of the selected character |

## Usage

1) Register the `NgxMatTypeaheadModule` in your app module.
 > `import {NgCharacterSelectCarouselModule} from 'ng-character-select-carousel';`

 ```typescript
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
 ```

 2) Use the `NgCharacterSelectCarouselComponent` in your component.

```typescript
import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {Direction} from 'ng-character-select-carousel';

@Component({
  selector: 'app-root',
  template: `
      <div class="page">
        <div>
          <button (click)="left()">Left</button>
          <span>{{selectedAvatar}}</span>
          <button (click)="right()">Right</button>
        </div>
        <ng-character-select-carousel
            [spins]="eventsSubject.asObservable()"
            (selectedAvatar)="onSelectedAvatar($event)">
        </ng-character-select-carousel>        
      </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'character-select-carousel';

  public selectedAvatar: number;

  eventsSubject: Subject<Direction> = new Subject<Direction>();

  public left() {
    this.eventsSubject.next(Direction.Left);
  }

  public right() {
    this.eventsSubject.next(Direction.Right);
  }

  public onSelectedAvatar(index: number) {
    this.selectedAvatar = index;
  }
}

```

## Running the example in local env

* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build the component

Run `ng build ng-character-select-carousel` to build the library. The build artifacts will be stored in the `dist/ng-character-select-carousel` directory. Use the `--prod` flag for a production build.

## Image masks

For each character image an image mask should be provided.

This is an image that follows the outline of the character image with a white background.

This ensures there is no transparency overlap as characters spin over each other.

For example:

**Character image:**

![Character image example](https://github.com/matthewgerrard/ng-character-select-carousel/raw/master/src/assets/0.png)

**Image mask:**

![Character image mask example](https://github.com/matthewgerrard/ng-character-select-carousel/raw/master/src/assets/0-mask.png)


## Credits

[gsap](https://greensock.com) is amazing!
