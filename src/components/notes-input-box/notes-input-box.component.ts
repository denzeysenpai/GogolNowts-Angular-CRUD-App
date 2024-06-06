import { Component, Output, EventEmitter } from '@angular/core';
import { ToolsAndActionsComponent } from '../tools-and-actions/tools-and-actions.component';
import {FormControl, NgForm, NgModel} from '@angular/forms';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-notes-input-box',
  standalone: true,
  imports: [
    ToolsAndActionsComponent
  ],
  templateUrl: './notes-input-box.component.html',
  styleUrl: './notes-input-box.component.css'
})
export class NotesInputBoxComponent {
    id = 1
    placeholderTitle = 'Title'
    placeholderContent = 'Take a note... '
    note1 = new FormControl('')
    @Output() newItemEvent = new EventEmitter<string[]>();


    noteObject = {
      id: '',
      title: '',
      content: '',
      color: ''
    }

    Notes = [this.noteObject]

    func() {
    }

    onSubmit(value : string, title : string, description: string) {
      this.newItemEvent.emit([String(this.id),title, description,String(Date.now),'ONGOING']);
      this.id++
    }


    ShowOthers() {
      const title = document.getElementById('title-input');
      const bottomBar = document.getElementById('tools-and-actions');

      if((title != undefined && title != null) && (bottomBar != undefined && bottomBar != null)) {
        title.style.display = 'flex';
        bottomBar.style.display = 'flex';
      }
    }
}
