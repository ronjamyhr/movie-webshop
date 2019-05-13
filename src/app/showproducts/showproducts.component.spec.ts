import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowproductsComponent } from './showproducts.component';
import { DataServiceService } from '../services/data-service.service';
import { MockDataService } from '../services/mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductpresentationComponent } from '../productpresentation/productpresentation.component';


describe('ShowproductsComponent', () => {
  let component: ShowproductsComponent;
  let fixture: ComponentFixture<ShowproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowproductsComponent, ProductpresentationComponent ],
      imports: [ HttpClientModule ]

    })
    .overrideComponent(ShowproductsComponent, { set: { providers: [{ provide: DataServiceService, useClass: MockDataService }]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three movies', () => {
    //const fixture = TestBed.createComponent(ShowproductsComponent);
    //const component = fixture.debugElement.componentInstance;
    expect(component.productsArray.length).toEqual(3);
  });


});
