import { getListCC } from "./listDatabases";
import { Client } from "pg";
import moment from "moment";
import cliProgress from "cli-progress";
import { arrayToExcel } from "./arrayToExcel";

export const exportData = async () => {
  const test = await getListCC();
  //@ts-ignore
  const totalDBs = test.length; 

  const fechaInicio = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
  const fechaFin = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");

  const contratos = [];

  const progressBar = new cliProgress.SingleBar({
    format: "📊 Progreso [{bar}] {percentage}% | {value}/{total} conexiones",
    barCompleteChar: "█",
    barIncompleteChar: "-",
    hideCursor: true,
  });

  progressBar.start(totalDBs, 0); // Iniciar la barra

  for (let i = 0; i < totalDBs; i++) {
    //@ts-ignore
    const t = test[i];
    /* console.log(`\n🔄 Intentando conectar a la base de datos: ${t.rip_database}`); */

    const client = new Client({
      host: t.rip_host,
      port: parseInt(t.rip_port),
      user: t.rip_user,
      password: t.rip_pass,
      database: t.rip_database,
    });

    try {
      await client.connect();
      /* console.log(`✅ Conectado a: ${t.rip_database}`); */

      const { rows } = await client.query(
        `
          SELECT
            row_number() over (ORDER BY C.con_id)::text as "N°",
            CC.cc_nomcentrocosto as "Sucursal",
            CAT.cat_nomcateg::text as "Categoría",
            C.con_codbarra::text as "N° Contrato",
            C.con_pesototalcontratado::text as "Gramos Contrato",
            DTE.dte_folio::text as "N° Factura",
            to_char(C.con_fechacreacioncontratoreal, 'DD-MM-YYYY HH24:MI')::text as "Fecha Inicio",     
            to_char(MOV.mov_fechacreacionreal, 'DD-MM-YYYY HH24:MI')::text as "Fecha Anulación",
            CLI.cli_id_doc::text as "Cliente RUT",
            CLI.cli_nombres::text as "Cliente Nombres",
            CLI.cli_apellidopaterno::text as "Cliente Apellido Paterno",
            CLI.cli_apellidomaterno::text as "Cliente Apellido Materno",
            USR.usr_rut as "Responsable Anulación RUT",
            USR.usr_nombre as "Responsable Anulación Nombre",
            USR.usr_apellidopaterno as "Responsable Anulación Apellido Paterno",
            RESP.usr_rut as "Responsable Transacción RUT",
            RESP.usr_nombre as "Responsable Transacción Nombre",
            RESP.usr_apellidopaterno as "Responsable Transacción Apellido Paterno",
            MOT.mot_descripcion::text as "Motivo"

          FROM PUBLIC.tcc_contrato C
            INNER JOIN tcc_centrocosto CC ON CC.cc_id = C.con_cc_id
            INNER JOIN tcc_inversion INV ON INV.inv_id = CC.cc_inv_id
            INNER JOIN tcc_categoria CAT ON CAT.cat_id = C.con_cat_id
            INNER JOIN tcc_cliente CLI ON CLI.cli_id = C.con_cli_id
            INNER JOIN tcc_motivo MOT ON MOT.mot_id = C.con_mot_id
            INNER JOIN tcc_dte DTE ON DTE.dte_doc_id = C.con_id
            INNER JOIN tcc_movimiento MOV ON MOV.mov_id = DTE.dte_mov_id
            INNER JOIN tcc_usuario USR ON USR.usr_id = C.con_usr_id
          INNER JOIN tcc_usuario RESP ON RESP.usr_id = MOV.mov_usr_id
          WHERE 

            C.con_est_id = 12  -- ANULADO
            AND MOV.mov_cop_id = 2 -- CR
            LIMIT 5000;
        `
      );
      contratos.push(...rows);
    } catch (error) {
      console.error(`❌ Error en ${t.rip_database}:`, error);
    } finally {
      await client.end();
      /* console.log("🔌 Conexión cerrada."); */
    }

    progressBar.update(i + 1); 
  }

  progressBar.stop(); 


  const nombreExcel = `contratos_anulados${moment(fechaInicio).format("DDMMYYYY")}_${moment(fechaFin).format("DDMMYYYY")}.xlsx`
  arrayToExcel(contratos, nombreExcel)

  return nombreExcel;
};
