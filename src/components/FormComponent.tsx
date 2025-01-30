import { IonInput, IonItem, IonList } from '@ionic/react'
import { Alumno } from '../types/types'

interface FormComponentProps{
  alumnoSeleccionado: Alumno | undefined
}

function FormComponent({alumnoSeleccionado}:FormComponentProps) {
  return (
    <div>
      <IonList>
        <IonItem>
            <IonInput label='Nombre' placeholder='Nombre' content={alumnoSeleccionado?.nombre}/>
        </IonItem>
      </IonList>
    </div>
  )
}

export default FormComponent
