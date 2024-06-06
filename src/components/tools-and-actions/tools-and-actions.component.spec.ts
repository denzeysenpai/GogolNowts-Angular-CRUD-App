import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsAndActionsComponent } from './tools-and-actions.component';

describe('ToolsAndActionsComponent', () => {
  let component: ToolsAndActionsComponent;
  let fixture: ComponentFixture<ToolsAndActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsAndActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsAndActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
