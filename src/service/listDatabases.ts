import { Client } from "pg";

export const getListCC = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });

  try {
    await client.connect();
    console.log(`${process.env.DB_DATABASE_NAME} Conexión exitosa a la base de datos`);

    const tablesRes = await client.query(`
      select
        cc_id, cc_nomcentrocosto, cc_nomcentrocosto2,
        rip_id, rip_host, rip_port, rip_database, rip_user, rip_pass, rip_timestamp
      from 
        tcc_centrocosto tc
        inner join web_ipremoto wi
      on cc_id = rip_cc_id
      where cc_activa = 1
      and cc_id not in (2401,8401,3401,18401,17401,3999, 99999)
      order by cc_nomcentrocosto2  
    `)
    
    console.log("cc rescatados: ", tablesRes.rowCount)

    return tablesRes.rows 
  
  } catch (error) {
    console.error("Error al crear el backup:", error);
    return {
      type: "ERROR",
      error,
    };
  } finally {
    await client.end();
  }
};
