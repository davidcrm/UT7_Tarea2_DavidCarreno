import { IonAlert } from "@ionic/react";
import jsPDF from "jspdf";
import { Alumno } from "../types/types";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import convertirImagenBase64 from './convertirImagenBase64';

async function exportarPdf(alumnos: Alumno[]) {
  if (!alumnos || alumnos.length === 0) {
    <IonAlert title="Error" content="No hay datos que exportar"/>
    return;
  }

  const doc = new jsPDF();

  const logoUrl = "http://localhost:3000/uploads/cabecera_ILH.png";
  const logoBase64 = await convertirImagenBase64(logoUrl);

  if (!logoBase64) {
    console.error("No se pudo convertir la imagen a Base64");
    return;
  }
  doc.addImage(logoBase64,'PNG',10,10,180,20);
  // Título del documento
  doc.setFontSize(16);
  doc.text("Alumnos: ", 14, 40);

  // Definir las columnas y filas de la tabla
  const columns = ["Nombre", "Matrícula", "Sexo", "Email", "Repetidor", "Activo"];
  const rows = alumnos.map((alumno: Alumno) => [
    alumno.nombre,
    alumno.matricula,
    alumno.sexo,
    alumno.email,
    alumno.repetidor ? "Sí" : "No",
    alumno.activo ? "Sí" : "No",
  ]);

  // Generar la tabla
  autoTable(doc, {
    startY: 45,
    head: [columns],
    body: rows,
    didDrawPage: function (data) {
      // Obtener el número total de páginas
      const totalPages = doc.getNumberOfPages();

      // Agregar número de página en el pie de página
      doc.setFontSize(10);
      doc.text(
        `${totalPages}`,
        doc.internal.pageSize.width / 2, // Centrar el texto
        doc.internal.pageSize.height - 10, // Posición en el pie de página
        { align: "center" }
      );
    },
  });

   // Capturar gráficos
   const graficoSex = document.getElementById("grafico-sex");
   const graficoRep = document.getElementById("grafico-rep");

   if (graficoSex && graficoRep) {
     const pieCanvas = await html2canvas(graficoSex);
     const pieImg = pieCanvas.toDataURL("image/png");

     const barCanvas = await html2canvas(graficoRep);
     const barImg = barCanvas.toDataURL("image/png");
    
     doc.addPage("l")
     doc.text("Gráficos de Alumnos", 14, 20);
     doc.addImage(pieImg, "PNG", 10, 30, 90, 90);
     doc.addImage(barImg, "PNG", 110, 30, 90, 90);
   }

   // Guardar el PDF
   doc.save("alumnos.pdf");
};

export default exportarPdf;