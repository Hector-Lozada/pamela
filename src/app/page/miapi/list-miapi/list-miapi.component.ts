import { Component, OnInit } from '@angular/core';
import { Barbie } from './interfaces/barbie.interface'; // Importando la interfaz de Barbie
import { BarbieService } from './services/barbie.service'; // Servicio para interactuar con la API de Barbies
import { BarbieTableComponent } from "./table/table.component"; // Suponiendo que tienes una tabla para mostrar las Barbies

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [BarbieTableComponent], // Usando el componente de la tabla para las Barbies
  templateUrl: './list-miapi.component.html',
  styleUrls: ['./list-miapi.component.css']
})
export class ListsComponent implements OnInit {
  barbies: Barbie[] = []; // Lista de Barbies
  selectedBarbie: Barbie | null = null; // Para el modal

  constructor(private barbieService: BarbieService) { }

  ngOnInit(): void {
    this.cargarBarbies(); // Cargar las Barbies al inicio
  }

  cargarBarbies(): void {
    this.barbieService.getBarbies().subscribe({
      next: (data) => {
        this.barbies = data.barbies; // Asumiendo que la API devuelve una propiedad "barbies"
      },
      error: (err) => console.error('Error al cargar las Barbies:', err)
    });
  }

  agregarBarbie(barbie: Barbie): void {
    this.barbieService.createBarbie(barbie).subscribe({
      next: () => this.cargarBarbies(), // Recargar las Barbies después de agregar una nueva
      error: (err) => console.error('Error al agregar la Barbie:', err)
    });
  }

  editarBarbie(barbie: Barbie): void {
    this.selectedBarbie = barbie; // Mostrar los detalles de la Barbie en el modal para editar
  }

  actualizarBarbie(barbie: Barbie): void {
    if (barbie._id) {
      this.barbieService.updateBarbie(barbie._id, barbie).subscribe({
        next: () => {
          this.cargarBarbies(); // Recargar la lista de Barbies después de actualizar
          this.selectedBarbie = null; // Cerrar el modal
        },
        error: (err) => console.error('Error al actualizar la Barbie:', err)
      });
    }
  }

  eliminarBarbie(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta Barbie?')) {
      this.barbieService.deleteBarbie(id).subscribe({
        next: () => this.cargarBarbies(), // Recargar las Barbies después de eliminar una
        error: (err) => console.error('Error al eliminar la Barbie:', err)
      });
    }
  }
}
