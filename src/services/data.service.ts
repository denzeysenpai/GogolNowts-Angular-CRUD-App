import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface obj {
    id: string;
    title: string;
    description: string;
    date: string;
    status: string;
    color: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject<string[]>([])
  dataAdapter = this.dataSource.asObservable()
  default(){}

  private comm1 = new BehaviorSubject<any>(this.default())
  command = this.comm1.asObservable()

  private totalRecords = new BehaviorSubject<string[][]>([])
  rec = this.totalRecords.asObservable()

  // Records
  notesRecord : any = new Set()
  private RecordObject = new BehaviorSubject<obj[]>([])
  objectRecords : obj[] = []
  rOb = this.RecordObject.asObservable()
  records : string[][] = []

  constructor() { }

  removeInRecord(id : string) {
    console.log('Remove function called!')
    this.notesRecord.forEach((element: { id: string; }) => {
      if(element.id == id) {
        this.notesRecord.delete(element)
        console.log('Removed task: ' + element.id)
      }
    })
    this.RecordObject.next(this.notesRecord)
  }

  createAndInsertObject(id: string, title: string, description: string, date: string, status: string, color: string) {
    let object : obj;
    object = { id: id, title: title, description: description, date: date, status: status, color: color }
    this.notesRecord.add(object)
    this.RecordObject.next(this.notesRecord)
    console.log(this.notesRecord)
  }

  filterRecords(value : string) {
    console.log('Filter function called!')
    let temp : obj[] = []
    this.notesRecord.forEach((element: obj) => {
      function S(a : string, b : string) {
        return a.toLowerCase().includes(b.toLowerCase())
      }
      if(S(element.id, value) || S(element.title, value) || S(element.status, value)|| S(element.description, value) || S(element.date, value) || S(element.color, value)) {
        temp.push(element)
      }
    })
    return temp
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

  UpdateDataTable(collection : obj[]) {
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
    collection.forEach(object => {
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

  injectToAdapter(collection : string[]) {
    this.dataSource.next(collection);
    console.log('Service responded and received: ' + collection)
    this.records.push(collection)
  }

  SetCommand(comm : any) {
    this.comm1.next(comm())
    console.log('new command set')
  }

  executeCommand() {
    console.log('Service command executed')
    this.default()
  }

  private event = new Subject<any>()

  sendEvent() {
    this.event.next('')
  }

  receiveEvent() : Observable<any> {
    return this.event.asObservable()
  }
}
