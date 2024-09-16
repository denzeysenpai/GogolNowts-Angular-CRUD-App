import { Component, Output, EventEmitter, OnInit, ViewChild, output, Inject } from '@angular/core';
import { ToolsAndActionsComponent } from '../tools-and-actions/tools-and-actions.component';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { DataService } from '../../services/data.service';
// import { blob } from 'stream/consumers';
import { OutputTableComponent } from '../output-table/output-table.component';
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
export class NotesInputBoxComponent implements OnInit {
  id = 1
  placeholderTitle = 'Title'
  placeholderContent = 'Take a note... '
  note1 = new FormControl('')
  @Output() newItemEvent = new EventEmitter<string[]>();
  collection: string[] = []
  constructor(private data: DataService) { }


  @Inject(OutputTableComponent) out = Inject(OutputTableComponent)



  ngOnInit() {
    this.data.dataAdapter.subscribe(collection => this.collection = collection);
    console.log('ngOnInit called in NotesInputBoxComponent')
  }



  onSubmit(value: string, title: string, description: string) {
    this.newItemEvent.emit(this.collection);

    this.data.createAndInsertObject(String(this.id), title, description, 'Date to be added', 'In progress', value)
    console.log('inputBoxIsCommunicating: ' + value)
    // this.collection = [String(this.id),title, description,'date','ONGOING']
    // this.data.injectToAdapter(this.collection)
    // console.log('Data transfer for: ' + this.collection)
    this.id++

    let t = document.getElementById('title-input') as HTMLInputElement
    let c = document.querySelector('textarea')
    if (t != null && c != null) {
      t.value = ''
      c.value = ''
    }
    this.data.sendEvent();

    // const resp = fetch("localhost:8080",{
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: this.id,
    //     title: title,
    //     description: description
    //   })
    // })

  }


  ShowOthers() {
    const title = document.getElementById('title-input') as HTMLInputElement;
    const bottomBar = document.getElementById('tools-and-actions') as HTMLInputElement;
    console.log("CLicked")
    if ((title != undefined && title != null) && (bottomBar != undefined && bottomBar != null)) {
      title.style.display = 'flex';
      bottomBar.style.display = 'flex';
    }
  }
}
