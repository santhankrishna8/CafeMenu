import { Component ,HostListener} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  images = [
    'assets/i1.jpg',
    'assets/i2.jpg',
    'assets/i3.jpg'
  ]

  currentIndex = 0;
  startX: number = 0;
  endX: number = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }
  
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startX = event.clientX;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.endX = event.clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    if (this.startX > this.endX + 50) {
      this.nextImage(); // Swipe left
    } else if (this.startX < this.endX - 50) {
      this.previousImage(); // Swipe right
    }
  }

}
