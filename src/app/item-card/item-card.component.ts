import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TooGoodToGoObject } from '../item-service.service';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input() object!: TooGoodToGoObject;
}
