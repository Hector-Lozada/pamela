import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { Affiliation, Dbzs, Gender } from './interfaces/dbzs';
import { DbzService } from './servises/dbz.service';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [
    CardComponent,
    PaginacionComponent,
    SearchComponent
  ],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit {
  dbzs: Dbzs | undefined;

  constructor(
    private _srvDbz: DbzService
  ) { }

  ngOnInit(): void {
    this._srvDbz.getDbzs().subscribe((dbzAll) => {
      dbzAll.items.forEach((dbz) => {
        this._srvDbz.getDbz(dbz.id).subscribe((dbzData) => {
          dbz.Data = dbzData;
          this._srvDbz.nextURL = dbzAll.links.next;
          this._srvDbz.prevURL = dbzAll.links.previous;
        });
      });
      this.dbzs = dbzAll;
    });
  }

  setNewDbz(DbzsNew: Dbzs): void {
    this.dbzs = DbzsNew; 
    console.log(DbzsNew.links)
  }

  searchDbz(termino: string): void {
    if (termino) {
      let numero = Number(termino);
      if (!isNaN(numero)) {
        this._srvDbz.getDbz(numero).subscribe(personaje => {
          this.dbzs = {
            items: [{
              id: personaje.id,
              name: personaje.name,
              ki: personaje.ki,
              maxKi: personaje.maxKi,
              race: personaje.race,
              gender: null,  // Asignar gender si está disponible
              description: personaje.description,
              image: personaje.image,
              affiliation: null,  // Asignar affiliation si está disponible
              deletedAt: null,
              Data: personaje
            }],
            meta: {
              totalItems: 1,
              itemCount: 1,
              itemsPerPage: 10,
              totalPages: 1,
              currentPage: 1
            },
            links: {
              first: 'url_to_first_page',
              previous: '',
              next: '',
              last: 'url_to_last_page'
            }
          };
          this._srvDbz.prevURL = null;
          this._srvDbz.nextURL = null;
        });
      } else {
        // Si el término no es un número, buscar por nombre
        let url = 'https://dragonball-api.com/api/characters/';
        let personajeEncontrado = false;
        const buscarPorNombre = () => {
          this._srvDbz.getDbzs(url).subscribe(personajesAll => {
            personajesAll.items.forEach(rePersonaje => {
              if (rePersonaje.name.toLowerCase() == termino.toLowerCase()) {
                personajeEncontrado = true;
                this._srvDbz.getDbz(Number(rePersonaje.id)).subscribe(personaje => {
                  this.dbzs = {
                    items: [{
                      id: personaje.id,
                      name: personaje.name,
                      ki: personaje.ki,
                      maxKi: personaje.maxKi,
                      race: personaje.race,
                      gender:  null,
                      description: personaje.description,
                      image: personaje.image,
                      affiliation: null,
                      deletedAt: null,
                      Data: personaje
                    }],
                    meta: {
                      totalItems: 1,
                      itemCount: 1,
                      itemsPerPage: 10,
                      totalPages: 1,
                      currentPage: 1
                    },
                    links: {
                      first: 'url_to_first_page',
                      previous: '',
                      next: '',
                      last: 'url_to_last_page'
                    }
                  };
                  this._srvDbz.prevURL = null;
                  this._srvDbz.nextURL = null;
                });
              }
            });

            // Si no se ha encontrado el personaje, continuar con la siguiente página
            if (!personajeEncontrado && personajesAll.links.next) {
              url = personajesAll.links.next;
              buscarPorNombre();  // Llamar de nuevo la función para buscar en la siguiente página
            }
          });
        };

        buscarPorNombre();  // Iniciar la búsqueda
      }
    } else {
      // Si no se proporciona un término, volver al estado inicial
      this.ngOnInit();
    }
  }
  


}
