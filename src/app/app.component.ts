import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesInputBoxComponent } from '../components/notes-input-box/notes-input-box.component'
import { NotesContentComponent } from '../components/notes-content/notes-content.component'
import { SearchBarComponent } from '../components/search-bar/search-bar.component'
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { OutputTableComponent } from '../components/output-table/output-table.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NotesContentComponent,
    NotesInputBoxComponent,
    SearchBarComponent,
    FormsModule,
    OutputTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GogolTasx';
  noteCard = true;
  records : string[][] = []

  constructor(private da : DataService) {}

  onSubmit(value : string[]) {
    this.records.push(value)
    console.log(value)
    this.da.command.subscribe()

  }
}
