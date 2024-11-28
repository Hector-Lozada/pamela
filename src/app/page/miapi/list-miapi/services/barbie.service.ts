import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barbie } from '../interfaces/barbie.interface'; // Asegúrate de importar la interfaz de Barbie

@Injectable({
    providedIn: 'root'
})
export class BarbieService {
    private apiUrl = 'http://localhost:3000/api/barbie'; // Ruta base de la API para Barbies

    constructor(private http: HttpClient) { }

    // Obtener todas las Barbies
    getBarbies(): Observable<{ barbies: Barbie[] }> {
        return this.http.get<{ barbies: Barbie[] }>(this.apiUrl);
    }

    // Crear una nueva Barbie
    createBarbie(barbie: Omit<Barbie, '_id'>): Observable<Barbie> {
        return this.http.post<Barbie>(`${this.apiUrl}`, barbie);
    }

    // Actualizar una Barbie existente
    updateBarbie(id: string, barbie: Partial<Barbie>): Observable<Barbie> {
        return this.http.put<Barbie>(`${this.apiUrl}/${id}`, barbie);
    }

    // Eliminar una Barbie
    deleteBarbie(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
