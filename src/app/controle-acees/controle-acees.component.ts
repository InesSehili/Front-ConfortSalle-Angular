import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-controle-acees',
  templateUrl: './controle-acees.component.html',
  styleUrls: ['./controle-acees.component.scss']
})
export class ControleAceesComponent implements OnInit {
  jour:any;
   time:string;
   idRecuperer:number;
   bool=false;
   boolTemp=false;
  debutSeance:string;
  finSeance:string;
   verificationSeance:boolean;
  tableAcces:any[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.httpClient.get<any>('http://localhost:8083/getJour', {headers,responseType:'text' as 'json' }).subscribe((response: any)=>
      { this.jour=response;
        console.log(this.jour);},
      (error) =>{console.log(error);}
    );
    this.httpClient.get<any>('http://localhost:8083/getTime', {headers,responseType:'text' as 'json' }).subscribe((response: any)=>
      { this.time=response;
        console.log(this.time);
        },
      (error) =>{console.log(error);}
    );
    this.httpClient
      .get<any []>('http://localhost:8083/allTableAccee')
      .subscribe(
        (response) => {
          this.tableAcces = response;

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );


  }

  methAcces() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.httpClient.get<any>('http://localhost:8083/enseignatparIdEmpreinte',{headers,responseType:'text' as 'json'}).subscribe((response: number)=>
      {this.idRecuperer = response;
      if(this.idRecuperer==-1 ||this.idRecuperer==null)
      {this.bool=true;}
      else{this.bool=false;
        for (let t of this.tableAcces)
        {console.log(t.jour.name);
          console.log(t.enseignant.id);
       /* this.debutSeance=t.seance.debut;
        this.finSeance=t.seance.fin;
          this.httpClient.get<any>('http://localhost:8083/verifierSeance/'+this.time+'/'+this.debutSeance+'/'+this.finSeance).subscribe((response: any)=>
            { this.verificationSeance=response;
              console.log(this.verificationSeance);},
            (error) =>{console.log(error);}
          );*/
          if(t.enseignant.id==this.idRecuperer &&  t.jour.name==this.jour )
        { console.log('On ouvre la porte !');
          console.log('On Allume tout  automatiquement !');
          this.httpClient
            .get('http://localhost:8080/DemarrerServiceLuminosity')
            .subscribe(
              () => {},
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );
         this.httpClient
            .get('http://localhost:8081/OnClim')
            .subscribe(
              () => {},
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );
          this.httpClient
            .get('http://localhost:8083/ouvrirPorte')
            .subscribe(
              () => {


              },
              (error) => {
                console.log('Erreur ! : ' + error);
              }
            );

        }
          else{
            this.boolTemp=true;
          }

        }

      }
      console.log(this.idRecuperer);
      },
      (error) =>{console.log(error);}
    );
  }
}
