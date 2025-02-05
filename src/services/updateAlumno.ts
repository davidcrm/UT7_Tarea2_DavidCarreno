import {Alumno} from "../types/types";

  //modificar un alumno
  export const updateAlumno = async (formData: Alumno) => {
    try {
      const response = await fetch(`/api/alumnos/${formData.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
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