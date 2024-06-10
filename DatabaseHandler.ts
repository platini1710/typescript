import * as path from "path";
import {Database} from "sqlite3";
import {Cosecha} from './Cosecha';


export class DatabaseHandler {
    public db: Database;

    constructor() {
        const dbPath = path.resolve(__dirname, "DatabaseName.db");
        this.db = new Database(dbPath, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Connected to the database.");
        });
    }

     public  setup(): void {
        const createTable = "CREATE TABLE IF NOT EXISTS cosecha(mailAgricultor string, nombre string,apellido string,mailCliente string," +
           "nombreCliente string,apellidoCliente string, " +
           " nombreCampo string,ubicacionCampo String,frutaCosechada string , variedadCosechada string)";

        this.db.run(createTable);
    }

    public close(): void {
        this.db.close((err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Closed database");
            }
        });
    }

    public insertPerson(cosecha: Cosecha, callback: (err: any) => void): void {
        const insertMessage = "INSERT or REPLACE INTO cosecha(mailAgricultor,nombre,apellido,mailCliente,nombreCliente,apellidoCliente,nombreCampo,ubicacionCampo" +

        ",frutaCosechada,variedadCosechada) VALUES (?,?,?,?,?,?,?,?,?,?);";
        this.db.run(insertMessage, [cosecha.mailAgricultor , cosecha.nombre,cosecha.apellido,cosecha.mailCliente,cosecha.nombreCliente,cosecha.apellidoCliente,
            cosecha.nombreCampo,cosecha.ubicacionCampo,cosecha.frutaCosechada,cosecha.variedadCosechada], callback);
    }


    public findAll( callback: (err: Error, rows: Cosecha[]) => void): void {
        const getMessage = "SELECT * FROM cosecha ";
        this.db.all(getMessage,  callback);
    }

    public clearCosechaTable(callback: (err: any) => void): void {
        const deleteEverything = "DELETE FROM cosecha;";
        this.db.run(deleteEverything, callback);
    }

    // Serialize is used to run queries synchronized.
    // http://www.sqlitetutorial.net/sqlite-nodejs/statements-control-flow/
    public serialize(callback: () => void) {
        this.db.serialize(callback);
    }
}
