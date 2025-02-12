export const template = (mesAnio: string, url:string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contratos Anulados</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
  <table align="center" max-width="600px" width="600px" min-width="600px">
    <tr align="center" style="background-color: #000; height: 68px;">
      <td style=" border-bottom: 4px solid #C99D66; padding-left: 30px;padding-right: 30px;">
        <img src="https://resources.ilissolutions.cl/Cron-events/headerAurus.svg"/>
      </td>
    </tr>
    <tr style="height: 32px;">
      <td></td>
    </tr>
    <tr style="padding-left: 30px;padding-right: 30px;padding-bottom: 16px;">
      <td align="center">
        <img src="https://resources.ilissolutions.cl/Cron-events/representacion-contrato.png"/>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-left: 30px;padding-right: 30px;font-family: Montserrat, Arial, sans-serif; font-size: 24px; font-style: normal; font-weight: 500; line-height: 120%;">
        Resumen de Contratos Anulados del Mes
      </td>
    </tr>
    <tr style="height: 30px;">
      <td>

      </td>
    </tr>
    <tr style="font-family: Montserrat, Arial, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;">
      <td style="padding-left: 30px;padding-right: 30px;">
        <p>Estimado/a equipo de <b>Gerencia, Operaciones y Soporte,</b> <br/></p>

        Adjunto encontrarán el <b>Informe Mensual de Contratos Anulados</b> 
        correspondiente al período <b>${mesAnio}</b>. 
        Este informe contiene el detalle de todos los contratos anulados por <b>Sucursal.</b>
        
      </td>
       
    </tr>
      <tr style="height: 24px"></tr>
     <tr style="height: 38px" align="center">
        <td>
<a href="javascript:void(window.open('${url}'));">
  <img src="https://resources.ilissolutions.cl/Cron-events/button.png"/>
</a>
        </td>
      </tr>

      <tr style="height: 24px"></tr>
      <tr>
        <td
          align="center"
          style="
            display: flex;
            width: 540px;
            padding: 16px;
            justify-content: center;
            align-items: center;
            gap: 16px;
            padding-left: 30px;
            padding-right: 30px;
            border-radius: 8px;
            background: #f2f2f2;
          "
        >
          <div style="width: 40px; height: 40px; flex-shrink: 0">
            <img src="https://resources.ilissolutions.cl/Cron-events/soporte.svg"/>
          </div>
          <div style="font-family: Montserrat, Arial, sans-serif;
          font-size: 14px;
          font-style: normal;
          line-height: 150%;">
            Para consultas o asistencia, contáctenos al
            <span
              style="
                color:  #996e43;

                /* Body/Small */
                font-family: Montserrat, Arial, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: 150%;
                text-decoration:  #996e43;
                text-decoration-line: underline;
                text-decoration-style: solid;
                text-decoration-skip-ink: none;
                text-decoration-thickness: auto;
                text-underline-offset: auto;
                text-underline-position: from-font;
              "
              >+569 5709 1516, +569 4223 5181</span
            >, o a
            <span
              style="
                color: #996e43;
                font-family: Montserrat, Arial, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: 150%;
                text-decoration: #996e43;
                text-decoration-line: underline;
                text-decoration-style: solid;
                text-decoration-skip-ink: none;
                text-decoration-thickness: auto;
                text-underline-offset: auto;
                text-underline-position: from-font;
              "
            >

                soporteolimpo@aurusjoyeria.cl

            
            </span>
. ¡Estamos para ayudarle!
          </div>
        </td>
      </tr>

    <tr style="height: 32px;">
      <td></td>
    </tr>
    <tr style="background-color: #000; padding-bottom: 16px !important; display: flex; flex-direction: column; height: 276px;">
      <td align="center" style=" border-top: 4px solid #C99D66; padding-left: 30px; padding-right: 30px; padding-top: 10px;">
        <div style="margin-top: 24px; margin-bottom: 24px;">
          <img src="https://resources.ilissolutions.cl/Cron-events/lajoyeriadechile.svg"/>
        </div>
      </td>

      <td align="center" style="color: #FFF;
      text-align: center;
      font-family: Montserrat, Arial, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      align-self: stretch;
      padding-left: 30px;
      padding-right: 30px;
      margin-bottom: 16px;
      
      "
      >
        Gracias por preferir Aurus Joyería. Nos enorgullece ser parte de tus momentos más valiosos. Síguenos en nuestras redes sociales y descubre todo lo que tenemos para ti.
      </td>
      <td align="center" >
        <a href="https://www.instagram.com/aurusjoyeria/?hl=en" target="_blank" style="margin-right: 16px; text-decoration: none;">
          <img style="width: 48px; height: 48px;" src="https://resources.ilissolutions.cl/Cron-events/Instagram.png"/>
        </a>
        <a href="https://www.facebook.com/Aurusjoyeria/?locale=es_LA" target="_blank" style="text-decoration: none;">
          <img style="width: 48px; height: 48px;" src="https://resources.ilissolutions.cl/Cron-events/Facebook.png"/>
        </a>
        
      </td>
    </tr>
  </table>
</body>
</html>
  `
}


