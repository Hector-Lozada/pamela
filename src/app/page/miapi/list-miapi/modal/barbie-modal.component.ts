import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barbie } from '../interfaces/barbie.interface';  // Asegúrate de que la interfaz esté importada correctamente

@Component({
    selector: 'app-barbie-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './barbie-modal.component.html',
    styleUrls: ['./barbie-modal.component.css']
})
export class BarbieModalComponent implements OnInit {
    @Input() barbie: Barbie | null = null;
    @Output() save = new EventEmitter<Barbie>();
    @Output() cancel = new EventEmitter<void>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            coleccion: ['', Validators.required],
            tipo: ['', Validators.required],
            accesorios: ['', Validators.required],  // Asegurando que los accesorios sean requeridos
            descripcion: ['', Validators.required],  // Asegurando que la descripción sea requerida
        });
    }

    ngOnInit(): void {
        if (this.barbie) {
            this.form.patchValue({
                ...this.barbie,
                accesorios: this.barbie.accesorios.join('\n')  // Convertir los accesorios a una cadena separada por saltos de línea
            });
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            const barbie: Barbie = {
                ...formValue,
                accesorios: formValue.accesorios.split('\n').filter((item: string) => item.trim()),  // Convertir la cadena de vuelta a un array
            };

            console.log('Datos enviados al servidor:', barbie);

            this.save.emit(barbie);
        } else {
            console.error('El formulario no es válido:', this.form.value);
        }
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
