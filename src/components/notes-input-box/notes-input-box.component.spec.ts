import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesInputBoxComponent } from './notes-input-box.component';

describe('NotesInputBoxComponent', () => {
  let component: NotesInputBoxComponent;
  let fixture: ComponentFixture<NotesInputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesInputBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
