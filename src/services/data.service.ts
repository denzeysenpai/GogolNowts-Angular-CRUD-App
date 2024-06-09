import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

interface obj {
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
