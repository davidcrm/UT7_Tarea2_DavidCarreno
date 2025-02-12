import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Alumno } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Props {
  alumnos: Alumno[];
}

const GraficosAlumnos: React.FC<Props> = ({ alumnos }) => {
  // Contar alumnos por sexo
  const totalMasculinos = alumnos?.filter(a => a.sexo === "M").length || 0;
  const totalFemeninos = alumnos?.filter(a => a.sexo === "F").length || 0;

  // Contar alumnos repetidores y no repetidores
  const totalRepetidores = alumnos?.filter(a => a.repetidor).length || 0;
  const totalNoRepetidores = (alumnos?.length - totalRepetidores);

   // Función para calcular porcentaje
   const calcularPorcentaje = (valor: number) => ((valor / alumnos.length) * 100).toFixed(1) + "%";

  const dataPie = {
    labels: [`Masculino (${calcularPorcentaje(totalMasculinos)})`, `Femenino (${calcularPorcentaje(totalFemeninos)})`],
    datasets: [
      {
        data: [totalMasculinos, totalFemeninos],
        backgroundColor: ["#4A90E2", "#E74C3C"],
      },
    ],
  };
  
  const dataBar = {
    labels: [`Repetidores (${calcularPorcentaje(totalRepetidores)})`, `No Repetidores (${calcularPorcentaje(totalNoRepetidores)})`],
    datasets: [
      {
        label: "Cantidad de Alumnos",
        data: [totalRepetidores, totalNoRepetidores],
        backgroundColor: ["#F1C40F", "#2ECC71"],
      },
    ],
  };

return (
  <div className="container ">
    <div className="row justify-content-center">
      {/* Gráfico de Sectores */}
      <div className="col-md-5" id="grafico-sex">
        <h5 className="text-center">Sexo</h5>
        <Pie data={dataPie} />
      </div>

      {/* Gráfico de Barras */}
      <div className="col-md-5" id="grafico-rep">
        <h5 className="text-center">Repetidores</h5>
        <Pie data={dataBar} />
      </div>
    </div>
  </div>
);
};

export default GraficosAlumnos;
