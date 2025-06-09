import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  // Guardar un dato (puede ser objeto, array, string, etc)
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error guardando en localStorage', error);
    }
  }

  // Obtener un dato
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error leyendo de localStorage', error);
      return null;
    }
  }

  // Eliminar un dato específico
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    localStorage.clear();
  }
}
