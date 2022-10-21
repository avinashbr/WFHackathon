import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { templateModel } from '../models/template.model';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  recordedMessage: String = '';
  templateList: templateModel[] = [
    { id: 1, name: 'Transfer money from account1 to account2' },
    { id: 2, name: 'Check account balance in account account1' },
    { id: 3, name: 'Open Allen Smith profile in client management' },
    { id: 4, name: 'what is the balance of allen smith savings account' },
    {id:5,name:'add a hold recommendation to allen smith trade account as XXX'},
    {id:6,name:'Transfer XXXX from Allen Smith savings account to Brokerage Account'},
  ];
  displayedColumns: string[] = ['name'];
  listening: boolean = false;
  value: string = 'foo';
  control = new FormControl(this.value);
  updatedValue: string = '';
  recentlyExecutedCommands:templateModel[]=[];


  constructor(public service: VoiceRecognitionService) {
    this.service.init()
  }

  ngOnInit(): void {

  }
  update(editedVal: string) {
    console.log(editedVal);
    // this.value = 'this.control?.value;'
    this.recentlyExecutedCommands.push({id:1,name:editedVal});
    this.recentlyExecutedCommands=[...this.recentlyExecutedCommands];
  }

  cancel(index: number) {
    console.log(index);

    // this.control.setValue(this.value);
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

}
