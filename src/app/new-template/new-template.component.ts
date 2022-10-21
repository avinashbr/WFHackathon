import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.css']
})
export class NewTemplateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewTemplateComponent>) { }
data:string='';
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
