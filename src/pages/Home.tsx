import "./Home.css";
import { useEffect, useState } from "react";
import { Alumno } from "../types/types";
import TablaAlumnos from "../components/TablaAlumnos";
import FormComponent from "../components/FormComponent";
import {IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import {getAlumnos} from "../services/getAlumnos";
import { updateAlumno } from '../services/updateAlumno';
import { insertAlumno } from "../services/insertAlumno";
import {CircularProgress} from "@mui/material";
import GraficosAlumnos from "../components/graphics";
import exportarPdf from "../utils/exportarPdf";



const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alumnos, setAlumnos] = useState<Alumno[]>();
  const [alumno,setAlumno] = useState<Alumno>();
  const [searchText, setSearchText] = useState('');

  const alumnoConUltimaMatricula = alumnos?.reduce((acc, item) => 
    acc && acc.matricula 
      ? item.matricula > acc.matricula ? item : acc 
      : item
  );

  // LLamada a la funcion que trae los alumnos de la base de datos
  useEffect(() => {
    async function fetchAlumnos() {
      try {
        setIsLoading(true);
        const data = await getAlumnos();
        setAlumnos(data);
      }catch (err){
        setAlumnos([]);
        console.log("Ha habido un error" + err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAlumnos();
  }, []);

  const onAlumnoClick = (alumno: Alumno) => {
    setAlumno(alumno);
  };

  const agregarAlumno = async(formData: Alumno) => {
    const data = await insertAlumno(formData);
    // Si la lista de alumnos es undefined, le asigna un array vacío, sino, el alumno que le pasamos por parámetro
    setAlumnos([...(alumnos ?? []), data]);
  };

  // Devuelve todos los alumnos que no tienen el id que se ha pasado por parmetro (el eliminado)
  const eliminarAlumno = (id: number) => {
    const alumnosFiltrados = alumnos?.filter(item => item.id !== id);
    setAlumnos(alumnosFiltrados ?? alumnos);
  };

  const actualizarAlumno = async(formData: Alumno) => {
    const data = await updateAlumno(formData);

    if(!data) return;

    // Recorrer todos los alumnos
    setAlumnos(prev => prev?.map(item => {
      // Si el id del alumno actual es el mismo que es que recibimos por parámetro
      // Creamos un objeto con los datos previos y posteriormente los nuevos para que se actualicen
      if(item.id === data.id) {
        const alumnoActualizado = { ...prev, ...data };
        onAlumnoClick(alumnoActualizado);
        return alumnoActualizado;
      }
      // Si no coincide devolvemos el alumno sin modificarlo
      return item;
    }) ?? []); // Si el array de alumnos el undefined le damos un valor por defecto []
  };


  // Filtrar alumnos según el texto de búsqueda
  const alumnosFiltrados = alumnos?.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonGrid>
      <IonRow>
        {
          isLoading ? (
            <IonCol size="12" class="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <CircularProgress/>
            </IonCol>
          ) : (
            <>
                <IonCol size="12">
                  <IonSearchbar
                    placeholder="Buscar alumno..."
                    animated={true}
                    value={searchText}
                    debounce={300} // Retrasa la búsqueda para optimizar rendimiento
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                  />
                </IonCol>
              <IonCol size="6">
                <TablaAlumnos 
                  alumnos={searchText ? alumnosFiltrados : alumnosFiltrados}
                  onClick={onAlumnoClick} 
                  eliminarAlumno={eliminarAlumno}
                />
              </IonCol>
              <IonCol size="6" >
                  <FormComponent
                    alumnoSeleccionado={alumno}
                    matricula={(alumnoConUltimaMatricula?.matricula ?? 0) + 1} // Valor para generar una matricula nueva con el ultimo numero de matricula
                    clearAlumno={() => setAlumno(undefined)}
                    agregarAlumno={agregarAlumno}
                    actualizarAlumno={actualizarAlumno}
                    exportarPdf={() => exportarPdf(alumnos!)}
                  />
                <IonRow>
                  <GraficosAlumnos alumnos={searchText ? alumnosFiltrados! :alumnos!}/>
                </IonRow>
              </IonCol>

            </>
          )
        }
      </IonRow>
    </IonGrid>
  );
};
  
export default Home;
