import { Component, OnInit } from '@angular/core';
import { Digimon } from './interfaces/digimon.interface'; // Importando la interfaz de Digimon
import { DigimonService } from './services/digimon.service'; // Servicio para interactuar con la API de Digimons
import { DigimonTableComponent } from "./table/table.component"; // Suponiendo que tienes una tabla para mostrar los Digimons

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [DigimonTableComponent], // Usando el componente de la tabla para los Digimons
  templateUrl: './list-miapi.component.html',
  styleUrls: ['./list-miapi.component.css']
})
export class ListsComponent implements OnInit {
  digimons: Digimon[] = []; // Lista de Digimons
  selectedDigimon: Digimon | null = null; // Para el modal

  constructor(private digimonService: DigimonService) { }

  ngOnInit(): void {
    this.cargarDigimons(); // Cargar los Digimons al inicio
  }

  cargarDigimons(): void {
    this.digimonService.getDigimons().subscribe({
      next: (data) => {
        this.digimons = data.digimons; // Asumiendo que la API devuelve una propiedad "digimons"
      },
      error: (err) => console.error('Error al cargar los Digimons:', err)
    });
  }

  agregarDigimon(digimon: Digimon): void {
    this.digimonService.createDigimon(digimon).subscribe({
      next: () => this.cargarDigimons(), // Recargar los Digimons después de agregar uno nuevo
      error: (err) => console.error('Error al agregar el Digimon:', err)
    });
  }

  editarDigimon(digimon: Digimon): void {
    this.selectedDigimon = digimon; // Mostrar los detalles del Digimon en el modal para editar
  }

  actualizarDigimon(digimon: Digimon): void {
    if (digimon._id) {
      this.digimonService.updateDigimon(digimon._id, digimon).subscribe({
        next: () => {
          this.cargarDigimons(); // Recargar la lista de Digimons después de actualizar
          this.selectedDigimon = null; // Cerrar el modal
        },
        error: (err) => console.error('Error al actualizar el Digimon:', err)
      });
    }
  }

  eliminarDigimon(id: string): void {
    if (confirm('¿Estás seguro de eliminar este Digimon?')) {
      this.digimonService.deleteDigimon(id).subscribe({
        next: () => this.cargarDigimons(), // Recargar los Digimons después de eliminar uno
        error: (err) => console.error('Error al eliminar el Digimon:', err)
      });
    }
  }
}
