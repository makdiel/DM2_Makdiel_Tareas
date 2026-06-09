import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTabBar, IonTabButton,IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, IonIcon, IonTab } from '@ionic/angular/standalone';
import {home, person , camera  } from 'ionicons/icons';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTab, IonIcon,IonLabel,IonTabBar,IonTabButton, IonTabBar,IonContent, IonHeader, IonTitle, IonToolbar,  FormsModule]
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
