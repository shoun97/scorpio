import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";

export const arrayToExcel = async (array: Object[], fileName = "datos.xlsx") => {
  if (!array || array.length === 0) {
    console.error("❌ El array está vacío o no es válido.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Contratos Anulados");

  const headers = Object.keys(array[0]);

  worksheet.addRow(headers);
  worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4F81BD" }, // Color de fondo azul
  };

  array.forEach((obj) => {
    //@ts-ignore
    worksheet.addRow(headers.map((header) => obj[header]));
  });

  worksheet.addTable({
    name: "ContratosAnulados",
    ref: "A1",
    headerRow: true,
    style: {
      theme: "TableStyleMedium9",
      showRowStripes: true,
    },
    columns: headers.map((header) => ({ name: header, filterButton: true })),
    //@ts-ignore
    rows: array.map((obj) => headers.map((header) => obj[header])),
  });

  worksheet.columns.forEach((column, index) => {
    column.width = Math.max(
      headers[index].length,
      //@ts-ignore
      ...array.map((row) => (row[headers[index]] ? row[headers[index]].toString().length : 10))
    );
  });

  // Definir la carpeta donde se guardará el archivo
  const exportDir = path.join(__dirname, "exports");

  // Crear la carpeta si no existe
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Ruta completa del archivo
  const filePath = path.join(exportDir, fileName);

  // Guardar el archivo Excel en la carpeta "exports"
  await workbook.xlsx.writeFile(filePath);
  console.log(`✅ Archivo Excel guardado en: ${filePath}`);
};
