import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MockDataService } from '../services/mock-data.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
      providers: [ FormBuilder ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('clear cart after submit', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);
      expect(component.cart.length).toEqual(1);
      component.clearCart();
      expect(component.cart.length).toEqual(0);
    });
  });
  

});
