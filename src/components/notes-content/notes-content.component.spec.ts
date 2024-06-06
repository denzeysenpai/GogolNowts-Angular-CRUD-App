import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesContentComponent } from './notes-content.component';

describe('NotesContentComponent', () => {
  let component: NotesContentComponent;
  let fixture: ComponentFixture<NotesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
