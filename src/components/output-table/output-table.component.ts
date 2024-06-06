import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-output-table',
  standalone: true,
  imports: [CommonModule, OutputTableComponent],
  templateUrl: './output-table.component.html',
  styleUrl: './output-table.component.css'
})
export class OutputTableComponent {
  @Input() id = '1'
  @Input() title = 'Sample Title'
  @Input() desc = 'Sample Description of Note'
  @Input() date = 'Date Created'
  @Input() status = 'Note/Task Status'
  @Input() record : string[][] = [['1','2','3','4','5'],['1','2','3','4','5'],['1','2','3','4','5']]

  cname = 'table-generic'

  public Ret() {
    return console.log(this.record)
  }
}
