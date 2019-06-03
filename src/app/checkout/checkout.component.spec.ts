import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [RouterTestingModule, HttpClientModule],
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
});
