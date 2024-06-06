import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTableComponent } from './output-table.component';

describe('OutputTableComponent', () => {
  let component: OutputTableComponent;
  let fixture: ComponentFixture<OutputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
