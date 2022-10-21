import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { processTemplate } from '../models/processTemplate.mode';
import { templateModel } from '../models/template.model';
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords:string='';

  constructor(private httpClient:HttpClient) { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.text='';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }

  getTemplate():Observable<templateModel[]>{
    return this.httpClient.post<templateModel[]>('http://localhost:8080/command/listTemplates',{});
  }

  processTemplate(templateName:string):Observable<processTemplate>{
    var postData={
      "templateName":templateName
  }
    return this.httpClient.post<processTemplate>('http://localhost:8080/command/processTemplate',postData);
  }
}