import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersAmbiensaComponent } from '../controllers/brokers-ambiensa.component';

describe('BrokersComponent', () => {
  let component: BrokersAmbiensaComponent;
  let fixture: ComponentFixture<BrokersAmbiensaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokersAmbiensaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokersAmbiensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
