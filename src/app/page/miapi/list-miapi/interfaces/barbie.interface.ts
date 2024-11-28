// Interfaz para los accesorios
export interface Accesorio {
  nombre: string; // Nombre del accesorio (Ej: Gafas de sol, Bolso, etc.)
}

// Interfaz para Barbie
export interface Barbie {
  _id: string;
  nombre: string; // El nombre de la Barbie
  coleccion: string; // Colección a la que pertenece la Barbie (Ej: Fashionista, Signature, etc.)
  tipo: string; // Tipo de Barbie (Ej: Clásica, Deportiva, Profesional)
  accesorios: Accesorio[]; // Lista de accesorios que incluye la Barbie (Ahora usando la interfaz Accesorio)
  descripcion: string; // Descripción o detalles sobre la Barbie
}
