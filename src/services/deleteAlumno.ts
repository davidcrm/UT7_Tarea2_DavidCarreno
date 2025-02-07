import { API_URL } from "../config/config";
import { Alumno } from "../types/types";

export const deleteAlumno = async (idAlumno: number) => {
    try {
        const response = await fetch(`${API_URL}/alumnos/${idAlumno}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar el alumno');
        }
  
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Error en la eliminación del alumno:', error);
        throw error;
      }
}