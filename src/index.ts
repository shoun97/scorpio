import Koa from "koa";
import Router from "koa-router";
import moment from "moment";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { exportData } from "./service/extractData";
import { arrayToExcel } from "./service/arrayToExcel";
import { main } from "./process/main";

const app = new Koa();
const router = new Router();

dotenv.config();

main();

router.get("/download/:filename", async (ctx) => {
  const { filename } = ctx.params; 
  const filePath = path.join(__dirname, "../src/service/exports" , filename);

  console.log(filePath)
  console.log(`Buscando archivo en: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    ctx.status = 404;
    ctx.body = { error: "El archivo no existe" };
    return;
  }

  try {
    ctx.set("Content-Disposition", `attachment; filename=${filename}`);
    ctx.set("Content-Type", "application/octet-stream");

    // Crear stream y manejar errores
    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (err) => {
      console.error("Error al leer el archivo:", err);
      ctx.status = 500;
      ctx.body = { error: "Error al leer el archivo" };
    });

    ctx.body = fileStream;
  } catch (error) {
    console.error("Error en la descarga:", error);
    ctx.status = 500;
    ctx.body = { error: "Error interno del servidor" };
  }
});

app.use(router.routes()).use(router.allowedMethods());


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto: " + PORT);
});
