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

export interface VenteCaisse{
  idV: string;
  numc: string;
  ca: {
    numero: string;
    adresse: string;
    magasin: string;  
  };
  nump: Number;
  prdt: {
    idPrdt: Number;
    nom: string;
    prix: Number;
  };
  quantite: Number;
  dateV: Date;
}

export interface Caisse{
  numero: string;
  adresse: string;
  magasin: string;
  recettes: Number;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  rootUrl = 'http://localhost:64408/';
  venteUrl = 'api/ventes';
  caisseUrl = 'api/caisse';
  venteByCaisseUrl = 'api/ventes/caisse';

  constructor(private http: HttpClient) { }

  getVentes(): Observable<Vente> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<Vente>(this.rootUrl + this.venteUrl, { headers: reqHeader });
  }

  getCaisses(): Observable<Caisse> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<Caisse>(this.rootUrl + this.caisseUrl, { headers: reqHeader });
  }

  getVenteByCaisse(id): Observable<VenteCaisse[]> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<VenteCaisse[]>(this.rootUrl + this.venteByCaisseUrl + '?id=' + id, { headers: reqHeader });
  }
}
