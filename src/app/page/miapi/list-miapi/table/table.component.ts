import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarbieService } from '../services/barbie.service';  // Asegúrate de tener el servicio adecuado
import { Barbie } from '../interfaces/barbie.interface';  // Importa la interfaz de Barbie
import { BarbieModalComponent } from '../modal/barbie-modal.component';  // El componente del modal de Barbie

@Component({
    selector: 'app-barbie-table',
    standalone: true,
    imports: [CommonModule, BarbieModalComponent],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class BarbieTableComponent implements OnInit {
    barbies: Barbie[] = [];
    showModal = false;
    selectedBarbie: Barbie | null = null;

    constructor(private barbieService: BarbieService) { }

    ngOnInit(): void {
        this.loadBarbies();
    }

    loadBarbies(): void {
        this.barbieService.getBarbies().subscribe(
            (response) => {
                console.log(response); // Para verificar la estructura de la respuesta
                this.barbies = response.barbies;  // Ajusta esta línea según la estructura
            },
            (error) => {
                console.error('Error cargando las Barbies:', error);
            }
        );
    }

    openModal(barbie?: Barbie): void {
        this.selectedBarbie = barbie || null;
        this.showModal = true;
        console.log(this.showModal); // Para verificar si la variable se actualiza correctamente
    }

    closeModal(): void {
        this.showModal = false;
        this.selectedBarbie = null;
    }

    onSave(barbie: Barbie): void {
        if (barbie._id) {
            this.barbieService.updateBarbie(barbie._id, barbie).subscribe(() => {
                this.loadBarbies();
                this.closeModal();
            });
        } else {
            this.barbieService.createBarbie(barbie).subscribe(() => {
                this.loadBarbies();
                this.closeModal();
            });
        }
    }

    deleteBarbie(id: string): void {
        if (confirm('¿Está seguro de eliminar esta Barbie?')) {
            this.barbieService.deleteBarbie(id).subscribe(() => {
                this.loadBarbies();
            });
        }
    }
}
