import { Component, OnInit } from '@angular/core';
import { Medicament } from '../model/medicament';
import { MedicamentService } from '../service/medicament.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent implements OnInit {

  voirListesMedicaments: boolean = true;
  voirFormulaireAjout: boolean = false;
  voirFormulaireModification: boolean = true;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  medicament = this.medicamentService.medicament;
  medicaments : Medicament[] = [];
  messageErreur: string = "";

  constructor(private medicamentService: MedicamentService) { }

  medicamentForm: any;
  recherche: any;
  nombres: number = 0;

  ngOnInit(): void {
    this.medicamentForm = new FormGroup({
      libelle: new FormControl(this.medicament.libelle, [Validators.required]),
      prixUnitaire: new FormControl(this.medicament.prixUnitaire, [Validators.required]),
      quantite: new FormControl(this.medicament.quantite, [Validators.required]),
      categorie: new FormControl(this.medicament.categorie, [Validators.required]),
      datePeremption: new FormControl(this.medicament.datePeremption, [Validators.required]),
    })
    this.nombresOccurences();
    this.listesMedicaments();
  }

  get libelle(){
    return this.medicamentForm.get('libelle');
  }
  get prixUnitaire() {
    return this.medicamentForm.get('prixUnitaire');
  }
  get quantite() {
    return this.medicamentForm.get('quantite');
  }
  get categorie() {
    return this.medicamentForm.get('categorie');
  }
  get datePeremption() {
    return this.medicamentForm.get('datePeremption');
  }

  //Méthode de la liste de tous les médicaments à partir de MedicamentService
  listesMedicaments(): void {
    this.medicamentService.getAll().subscribe(response=>{
      this.medicaments = response;
    })
  }

  //Méthode de détail d'un médicament à partir de MedicamentService
  detailMedicament(id: number): void {
    console.log(id)
    this.medicamentService.findById(id).subscribe(response=>{
      this.medicament = response;
    })
  }

  //Méthode d'ajout d'un medicament à partir de MedicamentService
  ajouterMedicament(): void {
    this.medicamentService.addMedicament(this.medicament).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.medicaments.push({
            id: response.id,
            libelle: response.libelle,
            prixUnitaire: response.prixUnitaire,
            quantite: response.quantite,
            categorie: response.categorie,
            datePeremption : response.datePeremption,
          });
          this.nombresOccurences()
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, libellé déjà existant"
          this.afficherFormulaireAjouter();
          this.medicament.libelle = response.libelle;
          this.medicament.prixUnitaire = response.prixUnitaire;
          this.medicament.quantite = response.quantite;
          this.medicament.categorie = response.categorie;
          this.medicament.datePeremption = response.datePeremption;
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de modification d'un médicament à partir de MedicamentService
  modifierMedicament(): void {
    this.medicamentService.updateMedicament(this.medicament.id, this.medicament).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.retour();
          this.listesMedicaments();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de la modification, libellé déjà existant";
          this.afficherFormulaireModifier(this.medicament.id);
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de suppression d'un médicament par la clé primaire  à partir de MedicamentService
  supprimerParClePrimaire(id: number): void {
    this.medicamentService.deleteById(id).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.medicaments.length; index++) {
      //   if (index == this.medicament.id) {
      //     this.medicaments.splice(id,1);
      //   }
      // }
      this.listesMedicaments();
      this.nombresOccurences()
    });
  }

  //Méthode de suppression d'un médicament par l'objet entier à partir de MedicamentService
  supprimerMedicament(m: Medicament): void {
    this.medicamentService.deleteMedicament(m).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.medicaments.length; index++) {
      //   if (index == this.medicament.id) {
      //     this.medicaments.splice(this.medicament.id,1);
      //   }
      // }
      this.listesMedicaments();
      this.nombresOccurences()
    });
  }

  //Méthode d'affichage de la page de detail d'un médicament
  afficherPageDetail(id: number): void {
    this.voirListesMedicaments = false;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = false;
    this.detailMedicament(id);
  }

  //Méthode d'affichage de la page d'ajout d'un médicament
  afficherFormulaireAjouter(): void {
    this.voirListesMedicaments = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification;
    this.medicament = new Medicament();
  }

  //Méthode d'affichage de la page de modification d'un médicament
  afficherFormulaireModifier(id: number): void {
    this.voirListesMedicaments = false;
    this.voirFormulaireModification = false;
    this.detailMedicament(id);
  }

  //Méthode de retour de page de la liste des médicaments
  retour(): void {
    this.voirListesMedicaments = true;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  nombresOccurences(): void {
    this.medicamentService.count().subscribe(response=>{
      this.nombres = response;
    })
  }

}
