import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vente{
  produits: [{
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
    dateV: string
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
  dateV: string;
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
  rootUrl = 'http://1e7f4bc4.ngrok.io/';
  venteUrl = 'api/ventes';
  caisseUrl = 'api/ventes/caisses';
  venteByCaisseUrl = 'api/ventes/caisse';
  venteHistorique = 'api/ventes/historiques';

  constructor(private http: HttpClient) { }

  getVentes(adresse): Observable<Vente> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<Vente>(this.rootUrl + this.venteUrl + '?adresse=' + adresse, { headers: reqHeader });
  }

  getCaisses(adresse): Observable<Caisse> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<Caisse>(this.rootUrl + this.caisseUrl + '?adresse=' + adresse, { headers: reqHeader });
  }

  getVenteByCaisse(id): Observable<VenteCaisse[]> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    return this.http.get<VenteCaisse[]>(this.rootUrl + this.venteByCaisseUrl + '?id=' + id, { headers: reqHeader });
  }

  getVenteHistorique(date: Date, id: string): Observable<VenteCaisse[]> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'False' });
    const jours = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();
    if (id !== '') {
      return this.http.get<VenteCaisse[]>(this.rootUrl + this.venteHistorique + '?id=' + id 
                + '&jours=' + jours + '&mois=' + mois + '&annee=' + annee, { headers: reqHeader });
    } else {
      return this.http.get<VenteCaisse[]>(this.rootUrl + this.venteHistorique
      + '?jours=' + jours + '&mois=' + mois + '&annee=' + annee, { headers: reqHeader });
    }
  }
}
