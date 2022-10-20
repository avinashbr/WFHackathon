import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  recordedMessage: String = '';
  templateList: String[] = [
    'Transfer money from account1 to account2',
    'Check account balance in account account1'
  ];

  constructor(
    public service: VoiceRecognitionService
  ) {
    this.service.init()
  }

  ngOnInit(): void {
  }

  startService() {
    this.service.start()
  }

  stopService() {
    this.recordedMessage = this.service.text;
    this.service.stop()
  }

}
