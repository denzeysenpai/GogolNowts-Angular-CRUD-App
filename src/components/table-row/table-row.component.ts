import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [],
  template: `

  `,
  styleUrl: './table-row.component.css'
})
export class TableRowComponent {
  @Input() id = ''
  @Input() title =''
  @Input() desc = ''
  @Input() date = ''
  @Input() status = ''
  @Input() check = ''


}
