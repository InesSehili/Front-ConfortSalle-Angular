import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NgForm} from "@angular/forms";
@Injectable()
export class AuthService {
  isAuth = false;
  listEnseignant:any[];
  constructor(private httpClient: HttpClient) { }





  signIn(form: NgForm) {
    const email = form.value['email'];
    console.log(email);
    const motDePasse = form.value['motDePasse'];
    console.log(motDePasse);
    this.httpClient.get<any []>('http://localhost:8085/sAuthentifier/'+email).subscribe((response: any[])=>
      {this.listEnseignant = response;
      if(this.listEnseignant.length==1)
      {console.log("cette enseignant existe oui");
        if(this.listEnseignant[0].motDePasse==motDePasse)
      {this.isAuth=true;
      console.log("son mot de passe est correct");}}
      },
      (error) =>{console.log(error);}
    );
  }

  signOut() {
    this.isAuth = false;
  }
}
