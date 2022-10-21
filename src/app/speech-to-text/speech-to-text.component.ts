import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { processTemplate } from '../models/processTemplate.mode';
import { templateModel } from '../models/template.model';
import { NewTemplateComponent } from '../new-template/new-template.component';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  recordedMessage: String = '';
  templateList: templateModel[] = [
    { id: 1, templateName: 'Transfer money from account1 to account2' },
    { id: 2, templateName: 'Check account balance in account account1' },
    { id: 3, templateName: 'Open Allen Smith profile in client management' },
    { id: 4, templateName: 'what is the balance of allen smith savings account' },
    { id: 5, templateName: 'add a hold recommendation to allen smith trade account as XXX' },
    { id: 6, templateName: 'Transfer XXXX from Allen Smith savings account to Brokerage Account' },
  ];
  displayedColumns: string[] = ['name'];
  listening: boolean = false;
  recentlyExecutedCommands: templateModel[] = [];


  constructor(public service: VoiceRecognitionService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.service.init()
  }

  ngOnInit(): void {
    this.service.getTemplate().subscribe((data:templateModel[])=>{
      console.log(data);
      this.templateList = [...data];
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NewTemplateComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);
      if (result.length > 0) {
        let id = Math.max(...this.templateList.map(o => o.id));
        this.templateList.push({ id: id, templateName: result });
        this.templateList = [...this.templateList];
      }

    });
  }

  update(editedVal: string) {
    console.log(editedVal);
    if(editedVal.length>0){
    this.service.processTemplate(editedVal).subscribe((data:processTemplate)=>{
      console.log(data)
      let id = Math.max(...this.recentlyExecutedCommands.map(o => o.id));
      this.snackBar.open(editedVal, 'Success', {
        duration: 5000,
      });
      this.recentlyExecutedCommands.push({ id: id, templateName: editedVal });
      this.recentlyExecutedCommands = [...this.recentlyExecutedCommands];
    },err=>{
      console.log(err)
      this.snackBar.open('Something wrong!', 'Error', {
        duration: 5000,
      });
    })
    
    }

  }

  cancel(index: number) {
    console.log(index);
  }

  startService() {
    this.listening = true;
    this.service.start()
  }

  stopService() {
    this.listening = false;
    this.recordedMessage = this.service.text;
    this.service.stop()
  }
  removeTemplate(tl: templateModel) {
    this.templateList = this.templateList.filter(function( obj ) {
      return obj !== tl;
  });
    this.templateList = [...this.templateList]
  }


}
