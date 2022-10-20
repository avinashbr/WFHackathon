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
    { id:1,name: 'Transfer money from account1 to account2' },
    { id:1,name: 'Check account balance in account account1' }
  ];
  displayedColumns: string[] = ['name'];
  listening: boolean = false;
  value:string = 'foo';
  control = new FormControl(this.value);


  constructor(public service: VoiceRecognitionService) {
    this.service.init()
  }

  ngOnInit(): void {
    
  }
  update(event:any) {
    console.log(event);
    // this.value = 'this.control?.value;'
  }

  cancel(index:number) {
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
