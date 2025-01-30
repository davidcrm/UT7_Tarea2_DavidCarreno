import "./Home.css";
import { useEffect, useState } from "react";
import { Alumno } from "../types/types";
import TablaAlumnos from "../components/TablaAlumnos";
import FormComponent from "../components/FormComponent";

const Home: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>();
  const [alumno,setAlumno] = useState<Alumno>();

  const fetchAlumnos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/alumnos");

      if (!response.ok) {
        console.log("Error al obtener los alumnos");
        return;
      }
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.log("Error al obtener los datos");
    }
  };

  useEffect(() => {
    fetchAlumnos();
  });

  const onAlumnoClick = (a: Alumno) => {
    setAlumno(a);
    console.log(a)
  }
  return (
    <>
    <div>
      <div className="col-md-6">
            <TablaAlumnos alumnos={alumnos} onClick={onAlumnoClick}/>
          </div>
          <div className="col-ml-6">
            <FormComponent alumnoSeleccionado={alumno}/>
          </div>
            <div>
              <h1>{alumno?.nombre}</h1>
          </div>
    </div>
    
    </>
  );
};

export default Home;
