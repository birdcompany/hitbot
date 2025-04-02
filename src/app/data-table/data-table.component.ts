import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TooGoodToGoObject, ItemService } from '../item-service.service';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-data-table',
  imports: [MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements AfterViewInit {
  
  private itemService = inject(ItemService);
  
  displayedColumns: string[] = ['display_name', 'item_id', 'item_category', 'items_available'];

  itemList: TooGoodToGoObject[] = [];
  clickedItem?: TooGoodToGoObject;

  ngAfterViewInit(): void {
    
    this.itemService.getItems().subscribe((data: TooGoodToGoObject[]) => 
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
