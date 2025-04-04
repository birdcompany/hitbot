import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDashboardComponent } from './item-dashboard.component';

describe('ItemDashboardComponent', () => {
  let component: ItemDashboardComponent;
  let fixture: ComponentFixture<ItemDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
