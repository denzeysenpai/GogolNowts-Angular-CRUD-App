import { Data } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { obj } from '../../services/data.service'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  constructor(private data : DataService) { }
  objectRec : obj[] = []

  @Output() filterd = new EventEmitter<any>();

  ngOnInit(): void {
    this.data.rOb.subscribe(records => this.objectRec = records);
  }
  searchTask() {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement
    if(searchInput != undefined) {
      const searched = searchInput.value
      this.objectRec = this.data.filterRecords(searched)
      console.log(this.objectRec)
      this.data.UpdateDataTable(this.objectRec)
    }
  }
}
