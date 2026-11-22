import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moon, cafe } from 'ionicons/icons';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { LogSleepPage } from '../log-sleep/log-sleep.page';
import { LogSleepinessPage } from '../log-sleepiness/log-sleepiness.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class HomePage {
  constructor(public sleepService:SleepService, public modalController: ModalController) {
	addIcons({moon, cafe});

	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	// opens the logging sleep form as a modal pg
	presentLogSleep() {
		this.modalController.create({
			component: LogSleepPage
		}).then((modal) => {
			modal.present();
		});
	}

// opens logging sleepiness form as modal pg
	presentLogSleepiness() {
		this.modalController.create({
			component: LogSleepinessPage
		}).then((modal) => {
			modal.present();
		});
	}
	}
