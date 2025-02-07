import "./Home.css";
import { useEffect, useState } from "react";
import { Alumno } from "../types/types";
import TablaAlumnos from "../components/TablaAlumnos";
import FormComponent from "../components/FormComponent";
import {IonCol, IonGrid, IonRow } from "@ionic/react";
import {getAlumnos} from "../services/getAlumnos";


const Home: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>();
  const [alumno,setAlumno] = useState<Alumno>();

  // LLamada a la funcion que trae los alumnos de la base de datos
  useEffect(() => {
    async function fetchAlumnos() {
      try {
        const data = await getAlumnos();
        setAlumnos(data);
      }catch (err){
        setAlumnos([]);
        console.log("Ha habido un error" + err);
      }
    }
    fetchAlumnos();
  }, []);

  const onAlumnoClick = (alumno: Alumno) => {
    setAlumno(alumno);
  };

  const agregarAlumno = (alumno: Alumno) => {
    setAlumnos([...(alumnos ?? []), alumno]);
  };

  const eliminarAlumno = (id: number) => {
    const alumnosFiltrados = alumnos?.filter(item => item.id !== id);
    setAlumnos(alumnosFiltrados ?? []);
  };

  const actualizarAlumno = (alumno: Alumno) => {
    // Recorrer todos los alumnos
    setAlumnos(prev => prev?.map(item => {
      // Si el id del alumno actual es el mismo que es que recibimos por parámetro
      // Creamos un objeto con los datos previos y posteriormente los nuevos para que se actualicen
      if(item.id === alumno.id) return { ...prev, ...alumno };
      // Si no coincide devolvemos el alumno sin modificarlo
      return item;
    }) ?? []); // Si el array de alumnos el undefined le damos un valor por defecto []
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="6">
          <TablaAlumnos 
            alumnos={alumnos} 
            onClick={onAlumnoClick} 
            eliminarAlumno={eliminarAlumno}
          />
        </IonCol>
        <IonCol size="6">
          <FormComponent 
            alumnoSeleccionado={alumno} 
            ultimaMatricula={alumnos?.[alumnos?.length - 1]?.matricula}
            clearAlumno={() => setAlumno(undefined)}
            agregarAlumno={agregarAlumno}
            actualizarAlumno={actualizarAlumno}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
  
export default Home;
