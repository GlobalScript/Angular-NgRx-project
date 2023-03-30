import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingProductComponent } from './showing-product.component';

describe('ShowingProductComponent', () => {
  let component: ShowingProductComponent;
  let fixture: ComponentFixture<ShowingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
