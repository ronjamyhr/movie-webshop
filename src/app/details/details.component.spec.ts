import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteStub } from 'src/activatedRouteStub';
import { DataServiceService } from '../services/data-service.service';
import { MockDataService } from '../services/mock-data.service';


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let activatedRoute = new ActivatedRouteStub({ id: 76 });


  beforeEach(async(() => {
    activatedRoute.setParamMap({ id: 76 });
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [ 
        { provide: activatedRoute, useValue: activatedRoute },
        { provide: DataServiceService, useClass: MockDataService }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the id 76', () => {
    expect(component.singleMovie.id).toEqual(76);
  });

});
