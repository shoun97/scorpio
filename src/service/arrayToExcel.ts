import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";

export const arrayToExcel = async (array: any[], fileName = "datos.xlsx") => {
  if (!array || array.length === 0) {
    console.error("❌ El array está vacío o no es válido.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Contratos Anulados CR");

  // Agregar la columna "tipo N°" al inicio
  const headers = ["N°", ...Object.keys(array[0])];

  // Agregar Fila 4: Cabecera de la tabla
  const headerRowIndex = 1;
  worksheet.addRow(headers);
  worksheet.getRow(headerRowIndex).font = { bold: true, color: { argb: "000000" } };
  worksheet.getRow(headerRowIndex).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFCC99" },
  };

  // Agregar datos a la tabla
  array.forEach((obj, index) => {
    worksheet.addRow([index + 1, ...headers.slice(1).map((header) => obj[header])]);
  });

  // Definir tabla en Excel con filtros
  worksheet.addTable({
    name: "ContratosAnulados",
    ref: `A${headerRowIndex}`,
    headerRow: true,
    style: {
      theme: "TableStyleMedium7",
      showRowStripes: true,
    },
    displayName: "name",
    columns: headers.map((header) => ({ name: header, filterButton: true })),
    rows: array.map((obj, index) => [index + 1, ...headers.slice(1).map((header) => obj[header])])
  });

  // Ajustar ancho de columnas automáticamente
  worksheet.columns.forEach((column, index) => {
    column.width = Math.max(
      headers[index].length,
      ...array.map((row) => (row[headers[index]] ? row[headers[index]].toString().length : 10))
    );
  });

  // Crear la carpeta "exports" si no existe
  const exportDir = path.join(__dirname, "exports");
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Guardar el archivo en la carpeta "exports"
  const filePath = path.join(exportDir, fileName);
  await workbook.xlsx.writeFile(filePath);
  console.log(`✅ Archivo Excel guardado en: ${filePath}`);
};
