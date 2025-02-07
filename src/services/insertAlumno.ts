import { API_URL } from "../config/config";
import {Alumno} from "../types/types";

  //insertar un nuevo alumno
  export const insertAlumno = async (formData: Alumno) => {
    try {
      const { id, ...restoDeDatos } = formData;

      const response = await fetch(`${API_URL}/alumnos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(restoDeDatos),
      });

      if (!response.ok) {
        throw new Error('Error al insertar el alumno');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en la inserción del alumno:', error);
      throw error;
    }
  }