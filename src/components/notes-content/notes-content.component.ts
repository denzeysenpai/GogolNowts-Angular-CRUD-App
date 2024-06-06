import { Component, Input } from '@angular/core';
import { ToolsAndActionsComponent } from '../tools-and-actions/tools-and-actions.component'


@Component({
  selector: 'app-notes-content',
  standalone: true,
  imports: [
    ToolsAndActionsComponent
  ],
  templateUrl: './notes-content.component.html',
  styleUrl: './notes-content.component.css'
})
export class NotesContentComponent {
  @Input() isACard : boolean = false
  @Input() title = 'Untitled'
  @Input() content = ''
  @Input() color = ''
  @Input() date = ''
  @Input() noteID = ''
}
