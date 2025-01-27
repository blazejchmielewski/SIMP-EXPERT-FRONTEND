import { Component, OnDestroy } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy{

  isLoading$ = this.spinnerService.isLoading$;
  private subscription: Subscription;

  constructor(private spinnerService: SpinnerService) {
    this.subscription = this.isLoading$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
