import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MockDataService } from '../services/mock-data.service';

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

      component.addToCart(movies[0]);

      expect(component.cart.length).toEqual(1);
    });
    
  });


  it('should add two diffrent movies', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addToCart(movies[0]);
      component.addToCart(movies[1]);

      expect(component.cart.length).toEqual(2);
    });

  });

  it('should add two amount of the same movie', () => {

    const service = new MockDataService();

    service.fetchMovies().subscribe((movies) => {

      component.addToCart(movies[0]);
      component.addToCart(movies[0]);

      expect(component.cart.length).toEqual(1);
    });

  });
});
