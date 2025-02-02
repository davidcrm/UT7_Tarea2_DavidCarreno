import {IonButton, IonInput, IonItem, IonList, IonSelect, IonSelectOption} from '@ionic/react'
import {Alumno, Sexo} from '../types/types'
import {useEffect, useState} from 'react'

interface FormComponentProps{
  alumnoSeleccionado: Alumno | undefined
  onLimpiar: () => void
}

function FormComponent({alumnoSeleccionado, onLimpiar}:FormComponentProps) {
  const [formData,setFormData] = useState<Alumno>({
    nombre: "",
    matricula: 0o000,
    sexo: Sexo.M,
    email: null,
    repetidor: false,
    activo: false
  })
  useEffect(() => {
    if (alumnoSeleccionado) {
      setFormData(alumnoSeleccionado);
    } else {
      setFormData({
        nombre: '',
        matricula: 0,
        sexo: Sexo.M,
        email: '',
        repetidor: false,
        activo: false,
      });
    }
  }, [alumnoSeleccionado]);

  // Función para manejar cambios en los campos del formulario
  // keyof solo acepta claves validas del tipo Alumno
  const handleChange = (field: keyof Alumno, value: string | boolean) => {
    setFormData((prevData: Alumno) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <IonList>
        <IonItem>
          <IonInput
            label='Nombre'
            placeholder='Nombre'
            value={formData.nombre}
            onIonChange={(e) => (handleChange('nombre', e.detail.value!))}
            clearInput={true}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label='Matricula'
            value={formData.matricula}
            disabled
          />
        </IonItem>
        <IonItem>
          <IonSelect
            label='Sexo'
            placeholder='Sexo'
            value={formData.sexo}
          >
            <IonSelectOption value="M">Masculino</IonSelectOption>
            <IonSelectOption value="F">Femenino</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput
            type='email'
            label='Email'
            placeholder='Email'
            value={formData.email}
            clearInput={true}

          />
        </IonItem>
        <IonItem>
          <IonSelect
            label='Repetidor'
            placeholder='Repetidor'
            value={formData.repetidor}
          >
            <IonSelectOption value="true">Si</IonSelectOption>
            <IonSelectOption value="false">No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label='Activo'
            placeholder='Activo'
            value={formData.activo}
          >
            <IonSelectOption value="true">Si</IonSelectOption>
            <IonSelectOption value="false">No</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
      {alumnoSeleccionado ?
        <IonButton>Modificar</IonButton>
        : <IonButton>Guardar</IonButton>
      }
      <IonButton onClick={onLimpiar}>Limpiar</IonButton>
    </div>
  )
}

export default FormComponent
