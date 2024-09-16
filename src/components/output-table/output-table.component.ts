import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs'
import { TableRowComponent } from '../table-row/table-row.component'
// import { TemplateLiteral, TemplateLiteralElement } from '@angular/compiler';
import { __values } from 'tslib';

interface obj {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-output-table',
  standalone: true,
  imports: [CommonModule, OutputTableComponent, TableRowComponent],
  templateUrl: './output-table.component.html',
  styleUrl: './output-table.component.css'
})
export class OutputTableComponent implements OnInit {
  @Input() id = '1'
  @Input() title = 'Sample Title'
  @Input() desc = 'Sample Description of Note'
  @Input() date = 'Date Created'
  @Input() status = 'Note/Task Status'
  @Input() record: string[][] = [['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5']]
  cname = 'table-generic'
  completed = false

  collection: string[] = []
  records: string[][] = this.record
  @Output() newItemEvent = new EventEmitter<string[]>();

  objectRec : obj[] = []
  clickEventsubscription: Subscription;

  constructor(private data: DataService) {
    this.clickEventsubscription = this.data.receiveEvent().subscribe(() => {
      this.UpdateDataTable('');
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit() {
    this.data.dataAdapter.subscribe(collection => this.collection = collection);
    console.log('ngOnInit called in OutputTableComponent')
    this.data.rOb.subscribe(record => this.objectRec = record)

    // this.data.SetCommand(this.UpdateDataTable())
  }

  Set(color: string): string {
    const noteCol = document.getElementById('colorBlob');
    if (noteCol != undefined && noteCol != null) {
      switch (color) {
        case 'pink': return 'pink';
        case 'red': return 'rgba(255, 30, 30, 0.44)';
        case 'orange': return 'rgba(255, 180, 41, 0.44)';
        case 'blue': return 'rgba(0, 81, 255, 0.44)';
        case 'violet': return 'rgba(169, 80, 252, 0.44)';
        case 'green': return 'rgba(37, 226, 37, 0.44)';
        case 'white': return 'white';
        default: return ''
      }
    }
    else return ''
  }
  public DeleteThis() {
    let inp = document.querySelector('#deleteIdInput') as HTMLInputElement
    if(inp != undefined && inp != null) {
      this.data.removeInRecord(inp.value == null || inp.value == undefined ? '' : inp.value);
      console.log(inp.value)
      inp.value = ''
    }
    this.UpdateDataTable('')
  }
  UpdateDataTable(collection : any) {
    console.log('UpdateDataTable called')
    let table = document.querySelector('tbody')
    if (table != null) {
      table.innerHTML = `
        <tbody>
          <tr>
            <th style="padding: 10px 34px; border: 1px solid rgba(128, 128, 128, 0.473); border-radius: 10px;">ID</th>
            <th style="padding: 10px 34px; border: 1px solid rgba(128, 128, 128, 0.473); border-radius: 10px;">Title</th>
            <th style="padding: 10px 34px; border: 1px solid rgba(128, 128, 128, 0.473); border-radius: 10px;">Description</th>
            <th style="padding: 10px 34px; border: 1px solid rgba(128, 128, 128, 0.473); border-radius: 10px;">Date</th>
            <th style="padding: 10px 34px; border: 1px solid rgba(128, 128, 128, 0.473); border-radius: 10px;">Status</th>
          </tr>
        </tbody>`
    }
    this.objectRec.forEach(object => {
      const rowHtml = `
            <tr>
              <td style="padding: 10px 34px; max-width: 190px; border-radius: 10px; background-color: `+ this.Set(object.color) + `;">` + object.id + `</th>
              <td style="padding: 10px 34px; max-width: 190px; border-radius: 10px; background-color: `+ this.Set(object.color) + `;">` + object.title + `</th>
              <td style="padding: 10px 34px; max-width: 190px; border-radius: 10px; background-color: `+ this.Set(object.color) + `;">` + object.description + `</th>
              <td style="padding: 10px 34px; max-width: 190px; border-radius: 10px; background-color: `+ this.Set(object.color) + `;">` + object.date + `</th>
              <td style="padding: 10px 34px; max-width: 190px; border-radius: 10px; background-color: `+ this.Set(object.color) + `;">` + object.status + `</th>
            </tr>
            `
      if (table != null && table != undefined) table.innerHTML = table.innerHTML + rowHtml
    })

    let deleteInput = document.getElementById('deleteIdInput')
    let deleteButton = document.getElementById('deleteIdButton')

    if (deleteInput != undefined && deleteButton != undefined) {
      deleteInput.style.display = 'flex'
      deleteButton.style.display = 'flex'
    }
  }




  public Ret() {
    return console.log(this.record)
  }
}
