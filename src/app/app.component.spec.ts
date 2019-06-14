import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { ProductpresentationComponent } from './productpresentation/productpresentation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { FinishComponent } from './finish/finish.component';
import { ErrorComponent } from './error/error.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        ShowproductsComponent,
        ProductpresentationComponent,
        HeaderComponent,
        FooterComponent,
        DetailsComponent,
        AdminComponent,
        FinishComponent,
        ErrorComponent
      ],
    })
    .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  
});
