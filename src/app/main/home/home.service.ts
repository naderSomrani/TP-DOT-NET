import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vente{
  produit: [{
    idV: string;
    numc: string;
    nump: Number;
    prdt: {
      idPrdt: Number;
      nom: string;
      prix: Number;
    };
    quantite: Number;
    dateV: Date
  }];
  recettes: Number;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  rootUrl = 'http://localhost:64408/';
  venteUrl = 'api/ventes';

  constructor(private http: HttpClient) { }

  getVentes(): Observable<Vente> {

    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<Vente>(this.rootUrl + this.venteUrl, { headers: reqHeader });
  }
}
