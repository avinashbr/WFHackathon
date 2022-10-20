import { Component, OnInit } from '@angular/core';
import { templateModel } from '../models/template.model';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  realtimeSpeech: string = '';
  templateList: templateModel[] = [
    { name: 'Transfer money from account1 to account2' },
    { name: 'Check account balance in account account1' }
  ];
  displayedColumns: string[] = ['name'];
  listening: boolean = false;


  constructor(public service: VoiceRecognitionService) {
    this.service.init()
  }

  ngOnInit(): void {
    
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
