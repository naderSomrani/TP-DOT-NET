import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

export interface DialogData {
  id: string;
}

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
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  caisses: any;
  gerant_adresse: string;
  constructor(public dialog: MatDialog,
              private homeService: HomeService,
              private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('adresse') != null) {
      this.gerant_adresse = localStorage.getItem('adresse');
      this.homeService.getCaisses(this.gerant_adresse).subscribe(data => {
        this.caisses = data;
        console.log(data);
      });
    } else {
      this.router.navigate(['auth/login']);
    }

  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(HistoriqueDialogComponent, {
      width: '650px',
       data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'historique-dialog',
  templateUrl: 'historique-dialog.html',
})
export class HistoriqueDialogComponent implements OnInit{
  
  displayedColumns: string[] = ['id_vente', 'id_p', 'nom', 'prix', 'quantite', 'date'];
  dataSource = [];
  dataLoaded = false;
  constructor(
    public dialogRef: MatDialogRef<HistoriqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getVenteByCaisse(this.data.id).subscribe(data => {
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
        this.dataSource.push(element);
      });
      this.dataLoaded = true;
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}

