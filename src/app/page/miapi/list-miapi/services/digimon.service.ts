import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Digimon } from '../interfaces/digimon.interface';

@Injectable({
    providedIn: 'root'
})
export class DigimonService {
    private apiUrl = 'http://localhost:3000/api/digimons'; // Ruta base de la API para Digimons

    constructor(private http: HttpClient) { }

    // Obtener todos los Digimons
    getDigimons(): Observable<{digimons: Digimon[]}> {
        return this.http.get<{digimons:Digimon[]}>(this.apiUrl);
    }

    // Crear un nuevo Digimon
    createDigimon(digimon: Omit<Digimon, '_id'>): Observable<Digimon> {
        return this.http.post<Digimon>(`${this.apiUrl}`, digimon);
    }

    // Actualizar un Digimon existente
    updateDigimon(id: string, digimon: Partial<Digimon>): Observable<Digimon> {
        return this.http.put<Digimon>(`${this.apiUrl}/${id}`, digimon);
    }

    // Eliminar un Digimon
    deleteDigimon(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
