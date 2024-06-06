import { Component, Input, Output, EventEmitter } from '@angular/core';
import { emit } from 'process';
// import { NotesContentComponent } from '../notes-content/notes-content.component';
// import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tools-and-actions',
  standalone: true,
  imports: [],
  templateUrl: './tools-and-actions.component.html',
  styleUrl: './tools-and-actions.component.css'
})
export class ToolsAndActionsComponent {
  buttonText1 = 'Close'
  buttonText2 = 'Submit'
  buttonText3 = 'Clear'
  buttonText4 = 'Delete'
  @Input() isACard : boolean = false;
  @Output() output : any;
  @Output() newItemEvent = new EventEmitter<string>();

  Close() {

  }

  Delete(id : string) {

  }



  HideOthers() : void {
    const title = document.getElementById('title-input');
    const bottomBar = document.getElementById('tools-and-actions');
    const textArea = document.getElementById('notes-content');

    if((textArea != undefined && textArea != null) &&(title != undefined && title != null) && (bottomBar != undefined && bottomBar != null)) {
      bottomBar.style.display = 'none';
      textArea.style.height = '80px';
      title.style.display = 'none';
    }
  }

  Clear() : void {
    const title = document.getElementById('title-input');
    const textArea = document.getElementById('notes-content');

    if((textArea != undefined && textArea != null) &&(title != undefined && title != null)) {
      textArea.nodeValue = '';
      title.textContent = '';
    }
  }

  Submit() : void {
    this.newItemEvent.emit('submit');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ToggleBlob() {
    const blob = document.getElementById('colorBlob');
    if (blob != undefined && blob != null) {
      if (blob.className.includes('active')) {
        blob.classList.toggle('active');
        await this.delay(600);
      }

      blob.classList.toggle('active');
    }
  }

  Set(color : string) :void {
    const noteCol = document.getElementById('colorBlob');
    if (noteCol != undefined && noteCol != null) {
      switch(color) {
        case 'pink':
          noteCol.style.backgroundColor = 'pink';
          break;
        case 'red':
          noteCol.style.backgroundColor = 'rgb(255, 30, 30)';
          break;
        case 'orange':
          noteCol.style.backgroundColor = 'orange';
          break;
        case 'blue':
          noteCol.style.backgroundColor = 'rgb(0, 81, 255)';
          break;
        case 'violet':
          noteCol.style.backgroundColor = 'violet';
          break;
        case 'green':
          noteCol.style.backgroundColor = 'rgb(37, 226, 37)';
          break;
        case 'white':
          noteCol.style.backgroundColor = 'white';
          break;
      }
      this.ToggleBlob();
    }
  }
}
