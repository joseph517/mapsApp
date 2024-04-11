import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './couter-alone.component.html',
  styleUrls: ['./couter-alone.component.css']
})
export class CounterAloneComponent {

  @Input()
  public counter: number = 0;

  increaseBy( value: number ) {
    this.counter += value;
  }

  reset() {
    this.counter = 0;
  }


}
