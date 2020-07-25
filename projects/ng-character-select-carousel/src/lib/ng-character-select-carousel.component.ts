import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnDestroy, OnInit, Output,
  QueryList,
  ViewChildren,
  EventEmitter
} from '@angular/core';
import { gsap, Sine } from "gsap/dist/gsap"
import {
  IMG_SAMPLE_1,
  IMG_SAMPLE_2,
  IMG_SAMPLE_3,
  IMG_SAMPLE_MASK
} from './ng-character-select-carousel-img-samples';
import {Observable, Subscription} from 'rxjs';

export enum Direction {
  Left = '-=',
  Right = '+='
}

@Component({
  selector: 'ng-character-select-carousel',
  template: `
    <div class="container">
      <div class="carousel">
        <div #carouselItem>
            <img class="avatar-img" [src]="image1Url"/>
            <img class="avatar-img-mask" [src]="image1MaskUrl"/>
        </div>
        <div #carouselItem>
          <img class="avatar-img" [src]="image2Url"/>
          <img class="avatar-img-mask" [src]="image2MaskUrl"/>
        </div>
        <div #carouselItem>
          <img class="avatar-img" [src]="image3Url"/>
          <img class="avatar-img-mask" [src]="image3MaskUrl"/>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ng-character-select-carousel.component.scss']
})
export class NgCharacterSelectCarouselComponent implements OnInit, AfterViewInit, OnDestroy  {

  @Input()
  public image1Url: string;

  @Input()
  public image1MaskUrl: string;

  @Input()
  public image2Url: string;

  @Input()
  public image2MaskUrl: string;

  @Input()
  public image3Url: string;

  @Input()
  public image3MaskUrl: string;

  @Input()
  public spins: Observable<Direction>;

  @Output()
  public selectedAvatar = new EventEmitter<number>();

  @ViewChildren('carouselItem')
  private carouselItems: QueryList<ElementRef>;

  public currentAvatarIndex = 1;

  private readonly inactiveProperties = {
    filter: 'grayscale(100%)',
    scale: 0.5
  };

  private readonly opacityProperties = {
    opacity: 0.3
  };

  private alreadySpinning = true;

  private spinSubscription: Subscription;

  ngOnInit(): void {
    if (!this.image1Url) {
      this.image1Url = IMG_SAMPLE_1;
    }
    if (!this.image1MaskUrl) {
      this.image1MaskUrl = IMG_SAMPLE_MASK;
    }
    if (!this.image2Url) {
      this.image2Url = IMG_SAMPLE_2;
    }
    if (!this.image2MaskUrl) {
      this.image2MaskUrl = IMG_SAMPLE_MASK;
    }
    if (!this.image3Url) {
      this.image3Url = IMG_SAMPLE_3;
    }
    if (!this.image3MaskUrl) {
      this.image3MaskUrl = IMG_SAMPLE_MASK;
    }

    if (this.spins) {
      this.spinSubscription = this.spins.subscribe((d: Direction) => this.spinCarousel(d));
    }
    this.selectedAvatar.emit(this.currentAvatarIndex);
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.alreadySpinning = false);
    const nativeCarouselItems = this.getCarouselElements();
    gsap.set([nativeCarouselItems[1]], {
      x: 0
    });
    gsap.set([nativeCarouselItems[0],
      nativeCarouselItems[2]], this.inactiveProperties);
    gsap.set([nativeCarouselItems[0].firstChild,
      nativeCarouselItems[2].firstChild], this.opacityProperties);
  }

  ngOnDestroy(): void {
    if (this.spinSubscription) {
      this.spinSubscription.unsubscribe();
    }
  }

  private spinCarousel(direction: Direction): void {
    if (this.alreadySpinning) {
      return;
    }

    this.alreadySpinning = true;

    const carouselNativeElements = this.getCarouselElements();
    const currentLeftAvatarIndex = this.getPreviousIndex(this.currentAvatarIndex);
    const currentRightAvatarIndex = this.getNextIndex(this.currentAvatarIndex);

    const currentLeftAvatar = carouselNativeElements[currentLeftAvatarIndex];
    const currentCentralAvatar = carouselNativeElements[this.currentAvatarIndex];
    const currentRightAvatar = carouselNativeElements[currentRightAvatarIndex];

    let moveAcrossBackAvatar;
    let moveAcrossBackDirection;
    let moveToSideDirection;
    let moveToCenterAvatar;
    let moveToCenterDirection;
    const moveToSideAvatar = currentCentralAvatar;

    let nextAvatarIndex;

    if (direction === Direction.Right) {
      moveAcrossBackAvatar = currentLeftAvatar;
      moveAcrossBackDirection = Direction.Right;
      moveToSideDirection = Direction.Left;
      moveToCenterAvatar = currentRightAvatar;
      moveToCenterDirection = Direction.Left;
      nextAvatarIndex = currentRightAvatarIndex;
    } else {
      moveAcrossBackAvatar = currentRightAvatar;
      moveAcrossBackDirection = Direction.Left;
      moveToSideDirection = Direction.Right;
      moveToCenterAvatar = currentLeftAvatar;
      moveToCenterDirection = Direction.Right;
      nextAvatarIndex = currentLeftAvatarIndex;
    }

    this.selectedAvatar.emit(nextAvatarIndex);

    const timeline = gsap.timeline({ repeat: 0});
    timeline.set([moveAcrossBackAvatar], {
      zIndex: 0
    }).set([moveToCenterAvatar], {
      zIndex: 100
    }).set([moveToSideAvatar], {
      zIndex: 75
    }).to([moveToSideAvatar], {
      ...this.inactiveProperties,
      x: moveToSideDirection + '100%',
      ease: Sine.easeInOut,
      duration: 1
    }).to([moveToSideAvatar.firstChild], {
      ...this.opacityProperties,
      duration: 1,
      delay: -1
    }).to(moveAcrossBackAvatar, {
      x: moveAcrossBackDirection + '200%',
      duration: 1,
      delay: -1,
      ease: Sine.easeInOut,
    }).to(moveToCenterAvatar, {
      x: moveToCenterDirection + '100%',
      scale: 1,
      filter: 'none',
      ease: Sine.easeInOut,
      duration: 1,
      delay: -1,
    }).to(moveToCenterAvatar.firstChild, {
      opacity: 1,
      delay: -1
    }).eventCallback('onComplete', () => {
      this.alreadySpinning = false;
      this.currentAvatarIndex = nextAvatarIndex;
    });
  }

  private getPreviousIndex(index: number): number {
    return ((index + this.carouselItems.length - 1)
      % this.carouselItems.length);
  }

  private getNextIndex(index: number): number {
    return ((index + 1) % this.carouselItems.length);
  }

  private getCarouselElements(): any[] {
    return this.carouselItems.toArray().map(el => el.nativeElement);
  }
}
