import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigimonService } from '../services/digimon.service';
import { Digimon } from '../interfaces/digimon.interface';
import { DigimonModalComponent } from '../modal/digimon-modal.component';

@Component({
    selector: 'app-digimon-table',
    standalone: true,
    imports: [CommonModule, DigimonModalComponent],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class DigimonTableComponent implements OnInit {
    digimons: Digimon[] = [];
    showModal = false;
    selectedDigimon: Digimon | null = null;

    constructor(private digimonService: DigimonService) { }

    ngOnInit(): void {
        this.loadDigimons();
    }

    loadDigimons(): void {
        this.digimonService.getDigimons().subscribe(
          (response) => {
            console.log(response); // Para verificar la estructura de la respuesta
            this.digimons = response.digimons;  // Ajusta esta línea según la estructura
          },
          (error) => {
            console.error('Error cargando los Digimons:', error);
          }
        );
      }
      



    openModal(digimon?: Digimon): void {
        this.selectedDigimon = digimon || null;
        this.showModal = true;
        console.log(this.showModal); // Para verificar si la variable se actualiza correctamente
    }

    closeModal(): void {
        this.showModal = false;
        this.selectedDigimon = null;
    }

    onSave(digimon: Digimon): void {
        if (digimon._id) {
            this.digimonService.updateDigimon(digimon._id, digimon).subscribe(() => {
                this.loadDigimons();
                this.closeModal();
            });
        } else {
            this.digimonService.createDigimon(digimon).subscribe(() => {
                this.loadDigimons();
                this.closeModal();
            });
        }
    }

    deleteDigimon(id: string): void {
        if (confirm('¿Está seguro de eliminar este Digimon?')) {
            this.digimonService.deleteDigimon(id).subscribe(() => {
                this.loadDigimons();
            });
        }
    }
}
