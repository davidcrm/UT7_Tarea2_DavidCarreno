import {IonButton, IonInput, IonItem, IonList, IonSelect, IonSelectOption} from '@ionic/react'
import {Alumno, Sexo} from '../types/types'
import {useEffect, useState} from 'react'
import { insertAlumno } from '../services/insertAlumno';
import { updateAlumno } from '../services/updateAlumno';
import { EditOutlined, SaveAltOutlined } from '@mui/icons-material';
import { EraseIcon } from './Icons/Icons';

interface FormComponentProps{
  alumnoSeleccionado: Alumno | undefined;
  ultimaMatricula?: number;
  clearAlumno: () => void;
  agregarAlumno: (alumno: Alumno) => void;
  actualizarAlumno: (alumno: Alumno) => void;
}

function FormComponent({alumnoSeleccionado, ultimaMatricula = 0, clearAlumno, agregarAlumno, actualizarAlumno}:FormComponentProps) {
  const [formData,setFormData] = useState<Alumno>({
    id: 0,
    nombre: "",
    matricula: 0o000,
    sexo: Sexo.M,
    email: null,
    repetidor: false,
    activo: false
  });

  // Actualiza el formulario cada vez que cambia el alumno seleccionado
  useEffect(() => {
    if (alumnoSeleccionado) {
      setFormData(alumnoSeleccionado);
    } else {
      limpiarFormulario();
    }
  }, [alumnoSeleccionado]);

  // Establece valores predeterminados al formulario
  const limpiarFormulario = () => {
    setFormData({
      id: 0,
      nombre: '',
      matricula: 0,
      sexo: Sexo.M,
      email: '',
      repetidor: false,
      activo: false,
    });

    clearAlumno();
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      // Si el campo es booleano
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  // Maneja los cambios en los campos que son select
  // keyof asegura que los campos son aceptados por el tipo Alumno
  const handleSelectChange = (name: keyof Alumno, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const enviarAlumno = async () => {
    try {
      const data = await insertAlumno(formData);
      agregarAlumno(data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleActualizarAlumno = async() => {
    try {
      const data = await updateAlumno(formData);
      actualizarAlumno(data);
    } catch (error) {
      console.error('Error al enviar el formulario de actualización:', error);
    }
  };

  return (
    <div>
      <h1 style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px'}}>
        {alumnoSeleccionado === formData ? `Modificar registro.` : "Crear un nuevo registro."}
      </h1>
      <IonList>
        <IonItem>
          <IonInput
            label="Nombre"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            clearInput={true}
            onIonInput={handleChange}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Matricula"
            value={formData.matricula === 0 ? ultimaMatricula + 1 : formData.matricula}
            disabled={!!alumnoSeleccionado} />
        </IonItem>
        <IonItem>
          <IonSelect
            label="Sexo"
            placeholder="Sexo"
            value={formData.sexo}
            onIonChange={e => handleSelectChange('sexo', e.detail.value)}
          >
            <IonSelectOption value={Sexo.M}>Masculino</IonSelectOption>
            <IonSelectOption value={Sexo.F}>Femenino</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            value={formData.email}
            clearInput={true}
            onIonInput={handleChange}
          />
        </IonItem>
        <IonItem>
          <IonSelect
            label="Repetidor"
            placeholder="Repetidor"
            value={formData.repetidor.toString()}
            onIonChange={e => handleSelectChange('repetidor', e.detail.value === 'true')}
          >
            <IonSelectOption value="true">Sí</IonSelectOption>
            <IonSelectOption value="false">No</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="Activo"
            placeholder="Activo"
            value={formData.activo.toString()}
            onIonChange={e => handleSelectChange('activo', e.detail.value === 'true')}
          >
            <IonSelectOption value="true">Sí</IonSelectOption>
            <IonSelectOption value="false">No</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
            {alumnoSeleccionado ? (
                <IonButton 
                  fill='outline'
                  disabled={JSON.stringify(formData) === JSON.stringify(alumnoSeleccionado)} 
                  onClick={handleActualizarAlumno}>
                    <EditOutlined/>
                </IonButton>
              ) : (
                <IonButton 
                fill='outline'
                onClick={enviarAlumno}>
                  <SaveAltOutlined/>
                </IonButton>
              )}
                <IonButton 
                fill='outline'
                  onClick={limpiarFormulario}>
                    <EraseIcon/>
                </IonButton>
      </div>
    </div>
  )
}

export default FormComponent
