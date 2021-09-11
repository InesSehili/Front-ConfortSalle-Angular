import {Component, Input, OnInit} from '@angular/core';
import {AppareilService} from "../services/apaareil.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mes-appareils',
  templateUrl: './mes-appareils.component.html',
  styleUrls: ['./mes-appareils.component.scss']
})
export class MesAppareilsComponent implements OnInit {
  @Input() appareilName: string ;
  @Input() appareilStatus: string ;
  @Input() index: number;
@Input() id: number ;
temp:number;

  constructor(private appareilService: AppareilService , private httpClient :HttpClient) { }

  ngOnInit(): void {
    this.httpClient
      .get('http://localhost:8081/recupererTempClim')
      .subscribe(
        (response :number) => {
          this.temp=response;
          console.log(this.temp);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  onSwitch() {
    /*if(this.appareilStatus === 'allumé'|| this.appareilStatus === 'automatique') {

      this.appareilService.SwitchOffOne(this.index);
    } else if(this.appareilStatus === 'éteint' || this.appareilStatus === 'automatique') {*/
      this.appareilService.SwitchOnOne(this.index);
    }

  offSwitch() {
  this.appareilService.SwitchOffOne(this.index);
  }
  onAutomatique()
  {this.httpClient
    .get('http://localhost:8081/recupererTempClim')
    .subscribe(
      (response :number) => {
        this.temp=response;
        console.log(this.temp);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    this.appareilService.SwitchAutoOne(this.index);

  }
  getColor() {
    if(this.appareilStatus === 'allumé') {
      return 'black';
    } else if(this.appareilStatus === 'éteint') {
      return 'black';
    }
    else if(this.appareilStatus === 'automatique')
    {return 'black';}
  }
  getStatus() {
    return this.appareilStatus;
  }

  onDiminuer() {
    this.temp=this.temp-1;
    this.httpClient.get('http://localhost:8081/diminuerTemClim').subscribe(() => { },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    this.appareilService.SwitchDiminuerClim(this.index);


  }

  onAugmenter() {
    this.temp=this.temp+1;
    this.httpClient.get('http://localhost:8081/augmenterTemClim').subscribe(() => { },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    this.appareilService.SwitchAugmenterClim(this.index);
  }
}
