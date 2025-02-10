import { API_URL } from "../config/config";
import {Alumno} from "../types/types";

  //modificar un alumno
  export const updateAlumno = async (formData: Alumno) => {
    try {
      // aisla el id del resto de datos porque el id lo pasamos como parámetro de la url
      const { id, ...restoDeDatos } = formData;

      const response = await fetch(`${API_URL}/alumnos/${formData.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(restoDeDatos),
      });

      if (!response.ok) {
        throw new Error('Error al modificar el alumno');
      }
      
      const result = await response.json();
      console.log(result)
      return result;

    } catch (error) {
      console.error('Error en la modificación del alumno:', error);
      throw error;
    }
  }