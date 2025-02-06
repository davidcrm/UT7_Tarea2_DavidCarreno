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

  const onAlumnoClick = (a: Alumno) => {
    setAlumno(a);
    console.log(a)
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="6">
          <TablaAlumnos alumnos={alumnos} onClick={onAlumnoClick} />
        </IonCol>
        <IonCol size="6">
          <FormComponent alumnoSeleccionado={alumno} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
  
export default Home;
