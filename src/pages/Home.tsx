import "./Home.css";
import { useEffect, useState } from "react";
import { Alumno } from "../types/types";
import TablaAlumnos from "../components/TablaAlumnos";

const Home: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>();

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
  
  return (
    <>
      <TablaAlumnos alumnos={alumnos} />
    </>
  );
};

export default Home;
