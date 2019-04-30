import { TestBed } from '@angular/core/testing';
import { DataServiceService } from './data-service.service';
import { HttpClientModule } from '@angular/common/http';


describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service).toBeTruthy();
  });
});
