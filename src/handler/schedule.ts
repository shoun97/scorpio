import moment from "moment"

export const getActualDay = () => {
  return moment().format("dddd")
}

export const isValidDate = (dayname: string) => {
  
  const excludeDays = [
    "Sunday",
    "Saturday"
  ]

  if(!excludeDays.includes(dayname))
    return true

}

export const getCronSchedule = (timeframe: string): string | null => {
  const match = timeframe.match(/^(\d+)?\s*(segundos|minutos|horas|día|semana|mes|día\s*habil|primer\s*día\s*habil\s*del\s*mes)$/i);

  if (!match) return null;

  const amount = match[1] ? parseInt(match[1]) : 1;
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "segundos":
      return `*/${amount} * * * * *`; // Cada X segundos
    case "minutos":
      return `*/${amount} * * * *`; // Cada X minutos
    case "horas":
      return `0 */${amount} * * *`; // Cada X horas
    case "día":
      return `0 0 */${amount} * *`; // Cada X días a medianoche
    case "semana":
      return `0 0 * * ${moment().day()}`; // Cada semana el mismo día de la semana actual
    case "mes":
      return `0 0 1 */${amount} *`; // Cada X meses (el primer día de cada mes)
    case "día habil":
      return `0 0 * * 1-5`; // Cada día hábil (lunes a viernes) a medianoche
    case "primer día habil del mes":
      return `0 0 1-7 * 1-5`; // Primer día hábil de cada mes
    default:
      return null;
  }
};




export const ejecutarPrimerDiaLaborable = () => {
  let fecha = moment().startOf("month"); 

  while (fecha.day() === 6 || fecha.day() === 0) {
    fecha.add(1, "day");
  }

  console.log(`Ejecutando proceso el: ${fecha.format("YYYY-MM-DD")}`);
};

// Ejemplo de uso:
console.log(getCronSchedule("10minutos")); // "*/10 * * * *"
console.log(getCronSchedule("2horas"));    // "0 */2 * * *"
console.log(getCronSchedule("día"));       // "0 0 */1 * *"
console.log(getCronSchedule("semana"));    // "0 0 * * 1" (Ejemplo si hoy es lunes)
