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
exports.DatabaseHandler = void 0;
const path = __importStar(require("path"));
const sqlite3_1 = require("sqlite3");
class DatabaseHandler {
    db;
    constructor() {
        const dbPath = path.resolve(__dirname, "DatabaseName.db");
        this.db = new sqlite3_1.Database(dbPath, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Connected to the database.");
        });
    }
    setup() {
        const createTable = "CREATE TABLE IF NOT EXISTS cosecha(mailAgricultor string, nombre string,apellido string,mailCliente string," +
            "nombreCliente string,apellidoCliente string, " +
            " nombreCampo string,ubicacionCampo String,frutaCosechada string , variedadCosechada string)";
        this.db.run(createTable);
    }
    close() {
        this.db.close((err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Closed database");
            }
        });
    }
    insertPerson(cosecha, callback) {
        const insertMessage = "INSERT or REPLACE INTO cosecha(mailAgricultor,nombre,apellido,mailCliente,nombreCliente,apellidoCliente,nombreCampo,ubicacionCampo" +
            ",frutaCosechada,variedadCosechada) VALUES (?,?,?,?,?,?,?,?,?,?);";
        this.db.run(insertMessage, [cosecha.mailAgricultor, cosecha.nombre, cosecha.apellido, cosecha.mailCliente, cosecha.nombreCliente, cosecha.apellidoCliente,
            cosecha.nombreCampo, cosecha.ubicacionCampo, cosecha.frutaCosechada, cosecha.variedadCosechada], callback);
    }
    findAll(callback) {
        const getMessage = "SELECT * FROM cosecha ";
        this.db.all(getMessage, callback);
    }
    clearCosechaTable(callback) {
        const deleteEverything = "DELETE FROM cosecha;";
        this.db.run(deleteEverything, callback);
    }
    // Serialize is used to run queries synchronized.
    // http://www.sqlitetutorial.net/sqlite-nodejs/statements-control-flow/
    serialize(callback) {
        this.db.serialize(callback);
    }
}
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=DatabaseHandler.js.map