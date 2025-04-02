import { AfterViewInit, Component, inject } from '@angular/core';
import { TooGoodToGoObject, ItemService } from '../item-service.service';
import { ItemCardComponent } from '../item-card/item-card.component';


@Component({
  selector: 'app-item-dashboard',
  imports: [ItemCardComponent],
  templateUrl: './item-dashboard.component.html',
  styleUrl: './item-dashboard.component.css'
})
export class ItemDashboardComponent implements AfterViewInit {
  private itemService: ItemService = inject(ItemService);
    
  displayedColumns: string[] = ['display_name', 'item_id', 'item_category', 'items_available'];

  itemList: TooGoodToGoObject[] = [];
  clickedItem?: TooGoodToGoObject;

  ngAfterViewInit(): void {
    
    this.itemService.getItems().subscribe((data) => 
      this.itemList = data
  );

    console.log(this.itemList);
    
  }

  orderItem(itemObj: TooGoodToGoObject): void {
    this.clickedItem = itemObj;

    this.itemService.orderItem(itemObj.item.item_id).subscribe((data: object) => {
      console.log(data);
    });
  }
}
