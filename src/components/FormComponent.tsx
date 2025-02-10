import {IonButton, IonInput, IonItem, IonList, IonSelect, IonSelectOption} from '@ionic/react'
import {Alumno, Sexo} from '../types/types'
import {useEffect, useState} from 'react'
import { insertAlumno } from '../services/insertAlumno';
import { updateAlumno } from '../services/updateAlumno';
import { EditOutlined, SaveAltOutlined, ShareOutlined } from '@mui/icons-material';
import { EraseIcon } from './Icons/Icons';

interface FormComponentProps{
  alumnoSeleccionado: Alumno | undefined;
  matricula: number;
  clearAlumno: () => void;
  agregarAlumno: (alumno: Alumno) => void;
  actualizarAlumno: (alumno: Alumno) => void;
  exportarPdf: () => void;
}

function FormComponent({alumnoSeleccionado, matricula, clearAlumno, agregarAlumno, actualizarAlumno, exportarPdf}:FormComponentProps) {
  const [formData,setFormData] = useState<Alumno>({
    id: 0,
    nombre: "",
    matricula,
    sexo: Sexo.M,
    email: null,
    repetidor: false,
    activo: false
  });

  // Actualiza el formulario cada vez que cambia el alumno seleccionado
  useEffect(() => {
    if (alumnoSeleccionado) {
      console.log('alumnoSeleccionado', alumnoSeleccionado);
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
      matricula: matricula,
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
            value={formData.matricula === 0 ? matricula : formData.matricula}
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
                  onClick={() => actualizarAlumno(formData)}
                >
                  <EditOutlined/>
                </IonButton>
              ) : (
                <IonButton 
                  fill='outline'
                  onClick={() => agregarAlumno(formData)}
                >
                  <SaveAltOutlined/>
                </IonButton>
              )}
              <IonButton fill="outline" onClick={exportarPdf}>
                <ShareOutlined />
              </IonButton>
              <IonButton 
                fill='outline'
                onClick={limpiarFormulario}
              >
                <EraseIcon/>
              </IonButton>
      </div>
    </div>
  )
}

export default FormComponent
