export interface Digimon {
  _id: string;  // El ID es opcional, ya que puede ser nuevo
  nombre: string;
  nivel: string;
  tipo: string;
  atributo: string;
  ataquesEspeciales: string[];
  descripcion: string;
}
