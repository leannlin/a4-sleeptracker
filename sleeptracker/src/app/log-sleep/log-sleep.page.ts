import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonDatetime, IonText, ModalController } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonDatetime, IonText, CommonModule, FormsModule]
})
export class LogSleepPage implements OnInit {
  bedtime:string = '';
  wakeTime:string = '';
  now:string = '';

  constructor(public modalController:ModalController, public sleepService:SleepService) { }

  ngOnInit() {
    // this defaults to last night 11pm and 7am this morning
    var lastNight = new Date();
    lastNight.setDate(lastNight.getDate() - 1);
    lastNight.setHours(23, 0, 0);
    var thisMorning = new Date();
    thisMorning.setHours(7, 0, 0);
    this.bedtime = this.toPickerString(lastNight);
    this.wakeTime = this.toPickerString(thisMorning);
    this.now = this.toPickerString(new Date());
  }

  toPickerString(date:Date):string {
    var offset_ms = date.getTimezoneOffset() * 60 *1000;
    return new Date (date.getTime() - offset_ms).toISOString().slice(0, 16);
  }

  // this will return error msg
  errorMessage():string {
    var sleptFor_ms = new Date(this.wakeTime).getTime() - new Date (this.bedtime).getTime();
    if (sleptFor_ms <=0) {
      return 'Your wake time needs to be after bedtime.';
    } 
    if (sleptFor_ms > 1000* 60 * 60 * 18) {
      return 'That is over 18 hours, please double check the dates.';
    }
    return '';
  }

  save() {
    var sleepData = new OvernightSleepData(new Date(this.bedtime),new Date(this.wakeTime));
    this.sleepService.logOvernightData(sleepData);
    this.modalController.dismiss();
  }

  cancel() {
    this.modalController.dismiss();
  }

}
