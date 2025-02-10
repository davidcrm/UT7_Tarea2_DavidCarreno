import "./Home.css";
import { useEffect, useState } from "react";
import { Alumno } from "../types/types";
import TablaAlumnos from "../components/TablaAlumnos";
import FormComponent from "../components/FormComponent";
import {IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import {getAlumnos} from "../services/getAlumnos";
import { updateAlumno } from '../services/updateAlumno';
import { insertAlumno } from "../services/insertAlumno";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import imageToBase64 from "image-to-base64";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alumnos, setAlumnos] = useState<Alumno[]>();
  const [alumno,setAlumno] = useState<Alumno>();
  const [prueba, setPruebas] = useState('');

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
    setAlumnos(alumnosFiltrados ?? []);
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

  const exportarPdf = async () => {
    if (!alumnos || alumnos.length === 0) {
      console.warn("No hay datos para exportar");
      return;
    }
  
    const doc = new jsPDF();

    //const urlImagen = "http://localhost:3000/uploads/cabecera_ILH.png"
  
    //const logoBase64 = await imageToBase64(urlImagen)
    // Agregar la imagen (posición x=10, y=10, ancho=50, alto=20)
    //doc.addImage(logoBase64, "PNG", 10, 10, 50, 20);
    // Título del documento
    doc.setFontSize(16);
    doc.text("Lista de Alumnos", 14, 15);
  
    // Definir las columnas y filas de la tabla
    const columns = ["ID", "Nombre", "Matrícula", "Sexo", "Email", "Repetidor", "Activo"];
    const rows = alumnos.map((alumno) => [
      alumno.id,
      alumno.nombre,
      alumno.matricula,
      alumno.sexo,
      alumno.email,
      alumno.repetidor ? "Sí" : "No",
      alumno.activo ? "Sí" : "No",
    ]);
  
    // Generar la tabla
    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: rows,
    });
  
    // Guardar el PDF
    doc.save("alumnos.pdf");
  };

  return (
    <IonGrid>
      <IonRow>
        {
          isLoading ? (
            <IonCol size="12" class="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
            </IonCol>
          ) : (
            <>
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
                  matricula={(alumnoConUltimaMatricula?.matricula ?? 0) + 1} // Valor para generar una matricula nueva con el ultimo numero de matricula
                  clearAlumno={() => setAlumno(undefined)}
                  agregarAlumno={agregarAlumno}
                  actualizarAlumno={actualizarAlumno}
                  exportarPdf={exportarPdf}
                />
              </IonCol>
            </>
          )
        }
      </IonRow>
    </IonGrid>
  );
};
  
export default Home;
