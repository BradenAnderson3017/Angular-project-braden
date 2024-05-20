import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupDetailsComponent } from './makeup-details.component';

describe('MakeupDetailsComponent', () => {
  let component: MakeupDetailsComponent;
  let fixture: ComponentFixture<MakeupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeupDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
