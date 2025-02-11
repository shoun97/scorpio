import { triggerProcess, getActualDay, isValidDate } from "../handler";
import { exportData, sendEmail } from "../service";
import { template } from "../templates/contratosanulados";

const disparadorCorreoAnulados = async () => {
  const nombreExcel = await exportData();

  sendEmail(
    ["murra@ilissolutions.cl"],
    template("01/2025", process.env.SERVIDOR + "/download/" + nombreExcel),
    "Contratos Anulados del Mes"
  );
};

export const main = async () => {
  triggerProcess("10 * * * * *", disparadorCorreoAnulados)
};
