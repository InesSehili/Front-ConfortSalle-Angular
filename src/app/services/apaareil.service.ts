
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class AppareilService {
   tempClim:number;
   appareils:any[];

 appareilsSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) {


  }

  getAppareilsFromServer() {
    /*this.httpClient
      .get<any []>('http://localhost:8085/Appareil')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
    this.appareils = [
      {
        id: 1,
        name: 'Lampe',
        status: 'éteint'
      },
      {
        id: 2,
        name: 'Climatiseur',
        status: 'allumé'
      },
      {
        id: 3,
        name: 'DataShow',
        status: 'éteint'
      }
    ];
    this.emitAppareilSubject();
  }

  emitAppareilSubject( ) {
   this.appareilsSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find
    ((appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  SwitchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
   this.emitAppareilSubject();
  }

  SwitchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
   this.emitAppareilSubject();
  }

  SwitchOnOne(index: number) {
    if(this.appareils[index].name=='Lampe')
    { this.httpClient
      .get('http://localhost:8080/OnLampe')
      .subscribe(
        () => {
          console.log('On allume tout !');

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );} if(this.appareils[index].name=='Climatiseur')
    { this.httpClient
      .get('http://localhost:8081/OnClim')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );}
   /* this.httpClient
      .get('http://localhost:8085/SetValue/'+index+'/allumé')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/

    this.appareils[index].status = 'allumé';
   this.emitAppareilSubject();
  }

  SwitchOffOne(index: number) {
    if(this.appareils[index].name=='Lampe')
    { this.httpClient
      .get('http://localhost:8080/OffLampe')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );}
    if(this.appareils[index].name=='Climatiseur')
    { this.httpClient
      .get('http://localhost:8081/OffClim')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );}
    /*this.httpClient
      .get('http://localhost:8085/SetStatuts/'+index+'/éteint')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/

    this.appareils[index].status = 'éteint';
   this.emitAppareilSubject();


  }
  SwitchAutoOne(index: number)
  { if(this.appareils[index].name=='Lampe')
  { this.httpClient
    .get('http://localhost:8080/AutomatiqueLampe')
    .subscribe(
      () => {},
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );}
    if(this.appareils[index].name=='Climatiseur')
    {
      }
    /*this.httpClient
      .get('http://localhost:8085/SetStatuts/'+index+'/automatique')
      .subscribe(
        () => { },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
    this.appareils[index].status = 'automatique';
    this.emitAppareilSubject();}



    SwitchAugmenterClim(index : number)
    {this.tempClim=this.tempClim+1;
      /*this.httpClient.get('http://localhost:8085/SetValue/'+index+'/'+this.tempClim).subscribe(
      () => {
        console.log('On Augmente !');

      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );*/
    }
  SwitchDiminuerClim(index : number)
  {this.tempClim=this.tempClim-1;
   /* this.httpClient.get('http://localhost:8085/SetValue/'+index+'/'+this.tempClim).subscribe(
      () => {
        console.log('On allume Diminue !');

      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );*/
  }
}
