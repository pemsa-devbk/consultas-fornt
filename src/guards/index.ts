export * from './Auth.guard';
export * from './PersistLogin';
export * from './terms.guard';

function cronToText(cronExpression: string): string {
  // Separar los campos de tiempo
  const [minute, hour, dayOfMonth, month, dayOfWeek] = cronExpression.split(" ");

  // Construir la cadena de salida
  let output = "Cada ";
  if (minute !== "*") {
    output += `${minute} minutos `;
  }
  if (hour !== "*") {
    output += `a las ${hour} horas `;
  }
  if (dayOfMonth !== "*") {
    output += `el día ${dayOfMonth} `;
  }
  if (month !== "*") {
    output += `del mes ${month} `;
  }
  if (dayOfWeek !== "*") {
    output += `los ${dayOfWeek} `;
  }

  // Remover el último espacio
  output = output.trim();

  // Reemplazar el último espacio con "y" o "con" si aplica
  const lastSpaceIndex = output.lastIndexOf(" ");
  if (lastSpaceIndex !== -1) {
    const lastWord = output.substring(lastSpaceIndex + 1);
    if (lastWord === "minutos" || lastWord === "horas" || lastWord === "día") {
      output = `${output.slice(0, lastSpaceIndex)} y ${lastWord}`;
    } else if (lastWord === "con") {
      output += ` ${minute} minutos`;
    } else {
      output += ` con ${minute} minutos`;
    }
  }

  // Agregar el prefijo "Todos los días" si no hay días especificados
  if (dayOfWeek === "*" && dayOfMonth === "*") {
    output = `Todos los días ${output}`;
  }

  return output;
}