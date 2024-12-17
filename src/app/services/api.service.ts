import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../interfaces/candidate';
import { ApiResponse } from '../api-response';
import { Skill } from '../interfaces/skill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any>(this.apiUrl + '/users');
  }

  getUserById(id: number) {
    return this.http.get<any>(this.apiUrl + '/users/' + id);
  }

  getAllCandidates() {
    return this.http.get<any>(this.apiUrl + '/candidates');
  }

  getSkillbyId(id: number) {
    return this.http.get<any>(this.apiUrl + '/skills/' + id);
  }

  getSkillNames(id: number) {
    return this.http.get<any>(this.apiUrl + '/candidates/' + id + '/skillNames');
  }

  updateCandidate(id: number, candidate: Candidate){
    return this.http.put<any>(this.apiUrl + '/candidates/' + id, candidate)
  }

  getCandidateById(id: number) {
    return this.http.get<any>(this.apiUrl + '/candidates/' + id);
  }

  addCandidate(candidate: Candidate) {
    return this.http.post<any>(this.apiUrl + '/candidates', candidate);
  }
}
