"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var csv_parse_1 = require("csv-parse");
var DatabaseHandler_1 = require("./DatabaseHandler");
var sqlite3 = require("sqlite3");
var world = 'world';
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
    console.log("cosecha: " + c.nombre + " ");
}
function errorHandler(err) {
    if (err) {
        console.log(err);
    }
}
var dbh = new DatabaseHandler_1.DatabaseHandler();
dbh.setup();
dbh.db.serialize(function () {
    dbh.clearPersonTable(errorHandler);
    /*
       dbh.insertPerson({
           firstname: "Niklas",
           lastname: "Andersson",
       }, errorHandler);
       dbh.insertPerson({
           firstname: "Marcus",
           lastname: "Niclasson",
       }, errorHandler);
    */
});
//dbh.findFirstPersonByLastName("Niclasson", printPerson);
//dbh.findPersonsByLastName("Andersson", (err, rows) => {
//   rows.forEach((row) => printPerson(err, row));
//});
// Fetch a random integer between -99 and +99
var db = new sqlite3.Database('./DatabaseName.db', function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the my database.');
});
var processFile = function () { return __awaiter(void 0, void 0, void 0, function () {
    var records, parser, _loop_1, _a, parser_1, parser_1_1, e_1_1;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                records = [];
                parser = fs
                    .createReadStream("cosechas.csv")
                    .pipe((0, csv_parse_1.parse)({
                    // CSV options if any
                    columns: false, delimiter: ";"
                }));
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 12]);
                _loop_1 = function () {
                    _d = parser_1_1.value;
                    _a = false;
                    var record = _d;
                    // Work with each record
                    console.info(record[1]);
                    records.push(record);
                    dbh.db.serialize(function () {
                        dbh.insertPerson({
                            mailAgricultor: record[1],
                            nombre: record[2],
                            apellido: record[3],
                            mailCliente: record[4],
                            nombreCliente: record[5],
                            apellidoCliente: record[6],
                            nombreCampo: record[7],
                            ubicacionCampo: record[8],
                            frutaCosechada: record[9],
                            variedadCosechada: record[10]
                        }, errorHandler);
                    });
                };
                _a = true, parser_1 = __asyncValues(parser);
                _e.label = 2;
            case 2: return [4 /*yield*/, parser_1.next()];
            case 3:
                if (!(parser_1_1 = _e.sent(), _b = parser_1_1.done, !_b)) return [3 /*break*/, 5];
                _loop_1();
                _e.label = 4;
            case 4:
                _a = true;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _e.trys.push([7, , 10, 11]);
                if (!(!_a && !_b && (_c = parser_1.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _c.call(parser_1)];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12: return [2 /*return*/, records];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, processFile()];
            case 1:
                records = _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
dbh.close();
