import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton, ModalController } from '@ionic/angular/standalone';
import { checkmarkCircle } from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton, CommonModule, FormsModule]
})
export class LogSleepinessPage implements OnInit {
  values = [1, 2, 3, 4, 5, 6, 7];
  scaleValues = StanfordSleepinessData.ScaleValues;
  selectedValue:number = 0; //  0 = nothing picked

  constructor(public modalController: ModalController, public sleepService:SleepService) {
    addIcons({checkmarkCircle });
   }

  ngOnInit() {
  }

  select(value:number) {
    this.selectedValue = value;
  }

  save() {
    // this will log at the current time, for ppl to rate how they feel in the present
    this.sleepService.logSleepinessData(new StanfordSleepinessData(this.selectedValue));
    this.modalController.dismiss();
  }

  cancel() {
    this.modalController.dismiss();
  }

}
