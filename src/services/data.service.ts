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

  private RecordObject = new BehaviorSubject<obj[]>([])

  objectRecords : obj[] = []
  rOb = this.RecordObject.asObservable()


  records : string[][] = []

  constructor() { }

  removeInRecord(id:string) {
    let dumbAssWayOfDeletingSomething : obj[] = []
    this.RecordObject.forEach(object => {
      let index = 0
      for(let i = 0; i < object.length; i++) {
        if(object[i].id == id) {
          index == i
          break
        }
      }

      for(let reallyDumbButIDontKnowAnyOtherWay = 0; reallyDumbButIDontKnowAnyOtherWay < object.length - 1; reallyDumbButIDontKnowAnyOtherWay++) {
        if(reallyDumbButIDontKnowAnyOtherWay != index) {
          dumbAssWayOfDeletingSomething.push(object[reallyDumbButIDontKnowAnyOtherWay]);
        }
      }
    })

    this.RecordObject.next(dumbAssWayOfDeletingSomething)
  }

  createAndInsertObject(id: string, title: string, description: string, date: string, status: string, color: string) {
    let object : obj;
    object = {
      id: id, title: title, description: description, date: date, status: status, color: color
    }

    this.objectRecords.push(object)
    this.RecordObject.next(this.objectRecords)
  }

  injectToAdapter(collection : string[]) {
    this.dataSource.next(collection);
    console.log('Service responded and received: ' + collection)
    this.records.push(collection)
  }

  getCollection() : string[][] {
    return this.records
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
