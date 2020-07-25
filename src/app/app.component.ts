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
            image1Url="./assets/0.png"
            image1MaskUrl="./assets/0-mask.png"
            image2Url="./assets/1.png"
            image2MaskUrl="./assets/1-mask.png"
            image3Url="./assets/2.png"
            image3MaskUrl="./assets/2-mask.png"
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
