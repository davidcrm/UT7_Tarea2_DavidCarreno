import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { Alumno } from '../types/types';

const Home: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>();

  const fetchAlumnos = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/alumnos');

      if (!response.ok){
        console.log('Error al obtener los alumnos')
        return;
      }
      const data = await response.json();
      setAlumnos(data)
      
    }catch (error){
      console.log('Error al obtener los datos')
    }
  };

  useEffect(() => {
    fetchAlumnos()
  })
  return (
      <div>
        {
          alumnos?.map((alumno, id) =>(
            <p key={id}>{alumno.nombre}</p>
          ))
        }
      </div>
  );
};

export default Home;
