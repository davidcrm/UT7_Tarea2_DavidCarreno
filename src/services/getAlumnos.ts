import { API_URL } from "../config/config";
import {Alumno} from "../types/types";

export const getAlumnos = async () => {
  try {
    const response = await fetch(`${API_URL}/alumnos`);

    if (!response.ok) {
      console.log("Error al obtener los alumnos");
      return;
    }
    const data: Alumno[] = await response.json()

    return data;
  } catch (error) {
    console.log("Error al obtener los datos");
  }
};