import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertiseDetails } from 'src/app/modules/core/models/expertise.model';
import { ExpertiseService } from 'src/app/modules/core/services/expertise.service';

@Component({
  selector: 'app-expertise-details',
  templateUrl: './expertise-details.component.html',
  styleUrls: ['./expertise-details.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', position: 'absolute' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', position: 'absolute' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ExpertiseDetailsComponent implements OnInit {
  uuid: string | null = null;
  expertise: ExpertiseDetails | null = null;
  images: string[] = [];
  currentIndex: number = 0;
  imagesCount: number = 0;

  animationState: 'next' | 'previous' | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private expertiseService: ExpertiseService
  ) {}

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    if (this.uuid) {
      this.expertiseService.getExpertiseDetails(this.uuid).subscribe({
        next: (resp) => {
          this.expertise = resp;
          this.expertiseService.getImageCount(this.expertise.expertiseUuid).subscribe({
            next: (resp) => {
              this.imagesCount = resp;
              for (let i = 0; i < this.imagesCount; i++) {
                if (this.expertise) {
                  this.expertiseService.getImage(this.expertise.expertiseUuid, i).subscribe({
                    next: (resp) => {
                      this.images.push(resp);
                    }
                  });
                }
              }
            }
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  nextSlide() {
    this.animationState = 'next';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.animationState = null;
    }, 500);
  }

  prevSlide() {
    this.animationState = 'previous';
    setTimeout(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.animationState = null;
    }, 500);
  }

  goToSlide(i: number) {
    if (i > this.currentIndex) {
      this.animationState = 'next';
    } else if (i < this.currentIndex) {
      this.animationState = 'previous';
    }
    setTimeout(() => {
      this.currentIndex = i;
      this.animationState = null;
    }, 500);
  }
}
