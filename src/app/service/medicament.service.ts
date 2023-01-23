import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicament } from '../model/medicament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  public medicament: Medicament = new Medicament();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence ;
  //url: http://localhost:8081/api/medicament/ajouter
  addMedicament(m: Medicament): Observable<Medicament>{
    return this.httpClient.post<Medicament>(this.url + 'medicament/ajouter', m);
  }

  //Modification d'une occurrence ;
  //url: http://localhost:8081/api/medicament/modifier/{id}
  updateMedicament(id: number, m: Medicament): Observable<Medicament>{
    return this.httpClient.put<Medicament>(this.url + 'medicament/modifier/'+id, m);
  }

  //Suppression d'une occurrence par la clé primaire ;
  //url: http://localhost:8081/api/medicament/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'medicament/supprimer/' + id);
  }

  //Suppression d'une occurrence par l'objet entier ;
  //url: http://localhost:8081/api/medicament/supprimer
  deleteMedicament(m: Medicament): Observable<Medicament>{
    return this.httpClient.post<Medicament>(this.url + 'medicament/supprimer', m);
  }

  //Affichage de toutes les occurrences ;
  //url: http://localhost:8081/api/medicaments
  getAll(): Observable<Array<Medicament>>{
    return this.httpClient.get<Array<Medicament>>(this.url + 'medicaments');
  }

  //Recherche d'une occurrence par la clé primaire ;
  //url: http://localhost:8081/api/medicament/{id}
  findById(id: number): Observable<Medicament>{
    return this.httpClient.get<Medicament>(this.url + 'medicament/' + id);
  }

  //Recherche d'une occurrence au moins par un autre attribut de l'entité;
  //url: http://localhost:8081/api/medicament/{libelle}
  findByLibelle(libelle: string): Observable<Medicament>{
    return this.httpClient.get<Medicament>(this.url + 'medpc/' + libelle);
  }

  //Affichage du nombre d'occurrences.
  //url: http://localhost:8081/api/medicament/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'medicament/count');
  };

}
