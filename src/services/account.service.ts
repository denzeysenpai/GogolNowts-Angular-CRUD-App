import { Injectable } from '@angular/core';
import { obj } from '../services/data.service'
import { BehaviorSubject } from 'rxjs';

export interface User{
  userId: string,
  username: string,
  password: string,
  notebookId: string
}

export interface UserRecords {
  record: User[]
}

export interface UserNotebook {
  notebookId: string,
  userId: string,
  garbageId: string,
  completedId: string
}

export interface CompletedNotes {
  noteId: string,
  content: obj[]
}

export interface GarbageNotes {
  noteId: string,
  content: obj[]
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  id = 0
  constructor() { }
  user : User = {
    userId: '1',
    username: 'seiya',
    password: 'pass123',
    notebookId: '0'
  }

  userNotebook : UserNotebook = {
    notebookId: '',
    userId: '',
    garbageId: '',
    completedId: ''
  }

  temporaryObject : obj[] = []
  completedNotes : CompletedNotes = {
    noteId: '',
    content: this.temporaryObject
  }

  garbageNotes : GarbageNotes = {
    noteId: '',
    content: this.temporaryObject
  }

  userRecord : User[] = []
  notebooks : UserNotebook[] = []

  private UserSubject = new BehaviorSubject<User>(this.user);
  private UserRecords = new BehaviorSubject<User[]>(this.userRecord);
  private UserNoteBooks = new BehaviorSubject<UserNotebook[]>(this.notebooks);
  private CompletedNotes = new BehaviorSubject<CompletedNotes>(this.completedNotes);
  private GarbageNotes = new BehaviorSubject<GarbageNotes>(this.garbageNotes);

  _user = this.UserSubject.asObservable();
  _userNoteBooks = this.UserNoteBooks.asObservable();
  _completedNotes = this.CompletedNotes.asObservable();
  _garbageNotes = this.GarbageNotes.asObservable();
  _userRecords = this.UserRecords.asObservable();

  LoginToAccount(usernameIn : string, passwordIn : string) {
    console.log('account login function called')
    return this.UserRecords.subscribe(user => {
      let p = user.find(item => item.userId == usernameIn)
      if(p) {
        console.log('user found')
        return user.find(item => item.password == passwordIn);
      }
      else {
        console.log('user not found')
        return false;
      }
    })
  }

  CreateUser(username : string, password : string) {
    let id = (Math.floor((Math.random() * 1000) + Math.random() * 1000)).toString() + `-${this.id}-2024`

    let newUser : User = {
      userId: id.toString(),
      notebookId: id.toString(),
      username: username,
      password: password
    }

    this.CreateNewNotebook(id.toString())

    this.id++
    this.userRecord.push(newUser)
    this.UserRecords.next(this.userRecord)
  }

  CreateNewNotebook(id : string){
    let newGarbageNotes : GarbageNotes = {
      noteId: id,
      content: this.temporaryObject.copyWithin(0,this.temporaryObject.length)
    }

    let newCompletedNotes : GarbageNotes = {
      noteId: id,
      content: this.temporaryObject.copyWithin(0,this.temporaryObject.length)
    }

    let newNotebook : UserNotebook = {
      userId: id,
      notebookId: id,
      garbageId: newGarbageNotes.noteId,
      completedId: newCompletedNotes.noteId
    }

    this.notebooks.push(newNotebook)
    this.UserNoteBooks.next(this.notebooks)
  }
  acountLogIn () {

  }
}
