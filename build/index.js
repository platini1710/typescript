"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const csv_parse_1 = require("csv-parse");
const DatabaseHandler_1 = require("./DatabaseHandler");
const sqlite3 = __importStar(require("sqlite3"));
const world = 'world';
//Used to print a person fetched from the database.
function printPerson(err, c) {
    if (err) {
        console.log(err);
        return;
    }
    // If nothing was fetched in the query.
    if (c === undefined) {
        console.log("No result");
        return;
    }
    console.log("Nombre  Agricultor :" + c.nombre + "\nApellido Agricultor  :" + c.apellido + "\nMall Agricultor :" + c.mailAgricultor + "\nNombre Cliente :" + c.nombreCampo +
        "\nMail Cliente :" + c.mailCliente + "\nUbicacion Campo :" + c.ubicacionCampo + "\nFruta Cosechada :" + c.frutaCosechada + "\nVariedad Cosechada" + c.variedadCosechada);
    console.log("\n");
}
function errorHandler(err) {
    if (err) {
        console.log(err);
    }
}
const dbh = new DatabaseHandler_1.DatabaseHandler();
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
        .pipe((0, csv_parse_1.parse)({
        columns: false, delimiter: ";"
    }));
    for await (const record of parser) {
        records.push(record);
        dbh.db.serialize(() => {
            dbh.insertPerson({
                mailAgricultor: record[0],
                nombre: record[1],
                apellido: record[2],
                mailCliente: record[3],
                nombreCliente: record[4],
                apellidoCliente: record[5],
                nombreCampo: record[6],
                ubicacionCampo: record[7],
                frutaCosechada: record[8],
                variedadCosechada: record[9]
            }, errorHandler);
        });
    }
    dbh.findAll((err, rows) => {
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
//# sourceMappingURL=index.js.map