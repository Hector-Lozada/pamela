import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Digimon } from '../interfaces/digimon.interface';  // Asegúrate de que la interfaz esté importada correctamente

@Component({
    selector: 'app-digimon-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './digimon-modal.component.html',
    styleUrls: ['./digimon-modal.component.css']
})
export class DigimonModalComponent implements OnInit {
    @Input() digimon: Digimon | null = null;
    @Output() save = new EventEmitter<Digimon>();
    @Output() cancel = new EventEmitter<void>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            nivel: ['', Validators.required],
            tipo: ['', Validators.required],
            atributo: ['', Validators.required],
            ataquesEspeciales: ['', Validators.required],  // Asegurando que los ataques especiales sean requeridos.
            descripcion: ['', Validators.required],  // Asegurando que la descripción sea requerida.
        });
    }

    ngOnInit(): void {
        if (this.digimon) {
            this.form.patchValue({
                ...this.digimon,
                ataquesEspeciales: this.digimon.ataquesEspeciales.join('\n')
            });
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            const digimon: Digimon = {
                ...formValue,
                ataquesEspeciales: formValue.ataquesEspeciales.split('\n').filter((item: string) => item.trim()),
            };

            console.log('Datos enviados al servidor:', digimon);

            this.save.emit(digimon);
        } else {
            console.error('El formulario no es válido:', this.form.value);
        }
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
