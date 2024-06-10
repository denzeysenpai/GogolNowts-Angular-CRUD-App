import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesContentComponent } from '../notes-content/notes-content.component';
import { NotesInputBoxComponent } from '../notes-input-box/notes-input-box.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { OutputTableComponent } from '../output-table/output-table.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NotesContentComponent,
    NotesInputBoxComponent,
    SearchBarComponent,
    FormsModule,
    OutputTableComponent,
    LoginPageComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
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
