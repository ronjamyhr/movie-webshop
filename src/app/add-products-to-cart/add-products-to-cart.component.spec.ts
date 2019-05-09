import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductsToCartComponent } from './add-products-to-cart.component';
import { DataServiceService } from '../services/data-service.service';
import { MockDataService } from '../services/mock-data.service';
import { ProductpresentationComponent } from '../productpresentation/productpresentation.component';

describe('AddProductsToCartComponent', () => {
  let component: AddProductsToCartComponent;
  let fixture: ComponentFixture<AddProductsToCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsToCartComponent, ProductpresentationComponent ]
    })
    .overrideComponent(AddProductsToCartComponent, { set: { providers: [{ provide: DataServiceService, useClass: MockDataService }]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an empty cart', () => {
    expect(component.cart.length).toEqual(0);
  });

  it('should add one product to cart', () => {
    component.addMovieToCart();
    expect(component.cart.length).toEqual(1);

  });

  // it('should add one product to cart, but amount should be two', () => {
  //   expect(component.cart.length).toEqual(1);
  // });


});
