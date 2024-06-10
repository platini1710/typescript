
import  * as  fs from 'node:fs';
import { parse } from 'csv-parse';

import {DatabaseHandler} from './DatabaseHandler';
import {Cosecha}          from './Cosecha';
import * as sqlite3 from 'sqlite3';





const world = 'world';




//Used to print a person fetched from the database.
function printPerson(err: Error, c: Cosecha): void {
    if (err) {
        console.log(err);
        return;
    }
    // If nothing was fetched in the query.
    if (c === undefined) {
        console.log("No result");
        return;
    }
    console.log("Nombre  Agricultor :" +  c.nombre + "\nApellido Agricultor  :" + c.apellido + "\nMall Agricultor :" + c.mailAgricultor + "\nNombre Cliente :" + c.nombreCampo +
     "\nMail Cliente :" + c.mailCliente  + "\nUbicacion Campo :" + c.ubicacionCampo + "\nFruta Cosechada :" +  c.frutaCosechada + "\nVariedad Cosechada" + c.variedadCosechada

    );
    console.log("\n");
}

function errorHandler(err: Error) {
    if (err) {
        console.log(err);
    }
}

const dbh: DatabaseHandler = new DatabaseHandler();
dbh.setup();
dbh.db.serialize(() => {
   dbh.clearCosechaTable(errorHandler);


});


  
let db = new sqlite3.Database('./DatabaseName.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connectado a la base de datos');
  });
  const processFile = async () => {
    const records = [];

    const parser = fs
      .createReadStream(`cosechas.csv`)
      .pipe(parse({

  
          columns: false,delimiter: ";"
      }));
    for await (const record of parser) {


      records.push(record);
      dbh.db.serialize(() => {
        dbh.insertPerson({
          mailAgricultor:record[0],
          nombre:record[1],
          apellido:record[2],
          mailCliente:record[3],
          nombreCliente:record[4],
          apellidoCliente:record[5],
          nombreCampo:record[6],
          ubicacionCampo:record[7],
          frutaCosechada:record[8],
          variedadCosechada:record[9]
      }, errorHandler);
      });
    }
    dbh.findAll( (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => printPerson(err, row));
    });

    dbh.close();
    return records;
  };
  
  (async () => {
    const records = await processFile();
   
  })();

