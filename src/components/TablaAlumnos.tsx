
import { Alumno } from '../types/types'
import './TablaAlumnos.css';

interface TablaAlumnosProps{
    alumnos: Alumno[] | undefined
}

function TablaAlumnos({alumnos}:TablaAlumnosProps) {

  return (
    <div className="tabla-container">
        <table>
          <thead>
            <tr className="header-row">
              <th className="header-cell">Nombre</th>
              <th className="header-cell">Matrícula</th>
              <th className="header-cell">Sexo</th>
              <th className="header-cell">Email</th>
              <th className="header-cell">Repetidor</th>
              <th className="header-cell">Activo</th>
            </tr>
          </thead>
          <tbody>
            {alumnos?.map((alumno, id) => (
            <tr key={id} className="data-row">
              <td>{alumno.nombre}</td>
              <td>{alumno.matricula}</td>
              <td>{alumno.sexo}</td>
              <td>{alumno.email}</td>
              <td>{alumno.repetidor ? 'Sí' : 'No'}</td>
              <td>{alumno.activo ? 'Sí' : 'No'}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
  )
}

export default TablaAlumnos
