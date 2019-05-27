import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  id: string;
  produit: string;
  prix: string;
  date: string;
}

export interface HistoriqueElement {
  id_vente: string;
  id_p: number;
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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HistoriqueComponent, {
      width: '650px',
      // data: {name: this.name, animal: this.animal}
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
export class HistoriqueComponent {
  
  displayedColumns: string[] = ['id_vente', 'id_p', 'nom', 'prix', 'quantite', 'date'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialogRef: MatDialogRef<HistoriqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
