import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MockDataService } from '../services/mock-data.service';
import { HttpClient } from "@angular/common/http";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should add one movie', () => {
    expect(component.cart.length).toEqual(0);

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);

      expect(component.cart.length).toEqual(1);
    });
    
  });


  it('should add two diffrent movies', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);
      component.addSingleMovieToCart(movies[1]);

      expect(component.cart.length).toEqual(2);
    });

  });

  it('should add two amount of the same movie', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);
      component.addSingleMovieToCart(movies[0]);

      expect(component.cart.length).toEqual(1);
    });

  });

  it('should add one more movie to cart', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);
      component.addSingleMovieToCart(movies[1]);
      
      expect(component.cart.length).toEqual(2);
    });

  });

  it('should add even one more movie to cart', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);
      component.addSingleMovieToCart(movies[1]);
      component.addSingleMovieToCart(movies[0]);
      
      expect(component.cart.length).toEqual(2);
      expect(component.cart[0].amount).toBe(2);
    });

  });

  it('should remove one movie from cart', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addSingleMovieToCart(movies[0]);
      component.deleteOneMovieFromCart(76);
      
      expect(component.cart.length).toEqual(0);
    });

  });


  it('should count totalprice in cart', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      expect(component.totalSum).toEqual(0);

      component.addSingleMovieToCart(movies[0]);
      component.addSingleMovieToCart(movies[0]);  
      component.countTotalPrice();

      expect(component.totalSum).toEqual(398);
    });

  });


  it('should count totalamount in cart', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      expect(component.totalAmount).toEqual(0);

      component.addSingleMovieToCart(movies[0]);
      component.addSingleMovieToCart(movies[0]);
      component.countTotalAmount();

      expect(component.totalAmount).toEqual(2);
    });

  });





});
