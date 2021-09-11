import { Component, OnInit } from '@angular/core';
import {AppareilService} from '../services/apaareil.service';
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

   m1: number;
   m2: number ;
   m3 :number;
   m4 :number;
  isAuth = false;
  appareils: any[];
  appareilSubscription: Subscription;
  mouvement: any;
  constructor(private appareilService: AppareilService , private httpClient: HttpClient ) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }
  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();



    }
  onAllumer() {
    this.appareilService.SwitchOnAll();


  }
  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.SwitchOffAll();
    } else {
      return null;
    }
  }
  onFetch() {
    this.appareilService.getAppareilsFromServer();


  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

 getMovement() {
    this.delay(4000);
  /*this.httpClient
      .get('http://localhost:8083/fermerPorte')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/

  this.httpClient.get<any>('http://localhost:8081/GetMouvement').subscribe(
    (response) => {
      this.m1 = response;
      console.log(this.m1);
    },
    (error) => {
      console.log('Erreur ! : ' + error);
    }
  );
  this.delay(1000);
   this.httpClient.get<any>('http://localhost:8081/GetMouvement').subscribe(
     (response) => {
       this.m2 = response;
       console.log(this.m2);
     },
     (error) => {
       console.log('Erreur ! : ' + error);
     }
   );
   this.delay(1000);
   this.httpClient.get<any>('http://localhost:8081/GetMouvement').subscribe(
     (response) => {
       this.m3 = response;
       console.log(this.m3);
     },
     (error) => {
       console.log('Erreur ! : ' + error);
     }
   );
   this.delay(1000);
   this.httpClient.get<any>('http://localhost:8081/GetMouvement').subscribe(
     (response) => {
       this.m4 = response;
       console.log(this.m4);
       if(this.m1== 1||this.m2==1||this.m3==1||this.m4==1)
       {console.log('kayan mouvement');
         this.httpClient
           .get('http://localhost:8083/fermerPorte')
           .subscribe(
             () => { },
             (error) => {
               console.log('Erreur ! : ' + error);
             }
           );
         this.httpClient
           .get('http://localhost:8081/OffClim')
           .subscribe(
             () => { },
             (error) => {
               console.log('Erreur ! : ' + error);
             }
           );
         this.httpClient
         .get('http://localhost:8080/OffLampe')
         .subscribe(
           () => { },
           (error) => {
             console.log('Erreur ! : ' + error);
           }
         );



       }
     },
     (error) => {
       console.log('Erreur ! : ' + error);
     }
   );




  }
}
