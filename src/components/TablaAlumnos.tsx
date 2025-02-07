
import { IonButton } from '@ionic/react'
import { Alumno } from '../types/types'
import { Delete, DeleteOutlineRounded } from '@mui/icons-material'
import { deleteAlumno } from '../services/deleteAlumno'

interface TablaAlumnosProps{
  alumnos: Alumno[] | undefined;
  onClick: (a: Alumno) => void;
  eliminarAlumno: (id: number) => void;
}

function TablaAlumnos({alumnos, onClick, eliminarAlumno}:TablaAlumnosProps) {

  return (

  <div className="d-flex flex-column" style={{ height: "100vh" }}>
    <div className="flex-grow-1 overflow-auto">
      <table className="table table-dark table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Matrícula</th>
            <th scope="col">Sexo</th>
            <th scope="col">Email</th>
            <th scope="col">Repetidor</th>
            <th scope="col">Activo</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {alumnos?.map((alumno, id) => (
            <tr key={id}>
              <td onClick={ () => onClick(alumno)}>{alumno.nombre}</td>
              <td onClick={ () => onClick(alumno)}>{alumno.matricula}</td>
              <td onClick={ () => onClick(alumno)}>{alumno.sexo}</td>
              <td onClick={ () => onClick(alumno)}>{alumno.email}</td>
              <td onClick={ () => onClick(alumno)}>{alumno.repetidor ? "Sí" : "No"}</td>
              <td onClick={ () => onClick(alumno)}>{alumno.activo ? "Sí" : "No"}</td>
              <td>
                <IonButton  
                  color='danger' 
                  onClick={async() => {
                    deleteAlumno(alumno.id);
                    eliminarAlumno(alumno.id);
                  }}
                >
                  <DeleteOutlineRounded color='action'/>
                </IonButton>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  )
}

export default TablaAlumnos
