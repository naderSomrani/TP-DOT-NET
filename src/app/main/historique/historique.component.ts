import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface HistoriqueElement {
  id_vente: string;
  id_p: Number;
  nom: string;
  prix: Number;
  quantite: Number;
  date: string;
}
  
const ELEMENT_DATA: HistoriqueElement[] = [
  {id_vente: '1', id_p: 1, nom: 'Hydrogen', prix: 1.0079, quantite: 10, date: 'He'},
  {id_vente: '1', id_p: 2, nom: 'Helium', prix: 4.0026, quantite: 10, date: 'He'},
  {id_vente: '1', id_p: 3, nom: 'Lithium', prix: 6.941, quantite: 10, date: 'Li'},
  {id_vente: '1', id_p: 4, nom: 'Beryllium', prix: 9.0122, quantite: 10, date: 'Be'},
  {id_vente: '1', id_p: 5, nom: 'Boron', prix: 10.811, quantite: 10, date: 'B'},
  {id_vente: '1', id_p: 6, nom: 'Carbon', prix: 12.0107, quantite: 10, date: 'C'},
  {id_vente: '1', id_p: 7, nom: 'Nitrogen', prix: 14.0067, quantite: 10, date: 'N'},
  {id_vente: '1', id_p: 8, nom: 'Oxygen', prix: 15.9994, quantite: 10, date: 'O'},
  {id_vente: '1', id_p: 9, nom: 'Fluorine', prix: 18.9984, quantite: 10, date: 'F'},
  {id_vente: '1', id_p: 10, nom: 'Neon', prix: 20.1797, quantite: 10, date: 'Ne'},
];

@Component({
  selector: 'historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['id_vente', 'id_p', 'nom', 'prix', 'quantite', 'date'];
  dataSource = new MatTableDataSource<HistoriqueElement>();;
  gerant_adresse: string;
  dataLoaded = false;

  date = new FormControl('', [Validators.required]);
  idCaisse = new FormControl('', [Validators.pattern('^[0-9]*$')]);

  constructor(private homeService: HomeService,
              private router: Router) { }
  
  ngOnInit(): void {
    if (localStorage.getItem('adresse') != null) {
      this.gerant_adresse = localStorage.getItem('adresse');
      this.homeService.getVentes(this.gerant_adresse).subscribe(data => {
        console.log(data);
        data.produits.forEach(vente => {
          const element: HistoriqueElement = {
            id_vente: vente.idV,
            id_p: vente.nump,
            nom: vente.prdt.nom,
            prix: vente.prdt.prix,
            quantite: vente.quantite,
            date: vente.dateV
          };
          this.dataSource.data.push(element);
        });
        console.log(this.dataSource.data);
        this.dataLoaded = true;
      });
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  filtrer(): void {
    const date = new Date(this.date.value);
    const id = this.idCaisse.value;
    console.log(date);
    console.log(id);
    this.homeService.getVenteHistorique(date, id).subscribe(data => {
      console.log(data);
      data.forEach(vente => {
        const element: HistoriqueElement = {
          id_vente: vente.idV,
          id_p: vente.nump,
          nom: vente.prdt.nom,
          prix: vente.prdt.prix,
          quantite: vente.quantite,
          date: vente.dateV
        };
        this.dataSource.data.push(element);
      });
      console.log(this.dataSource.data);
      // this.dataLoaded = true;
    });
  }

}
