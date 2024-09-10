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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_config_1 = __importDefault(require("./database-config"));
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    const migrationsPath = path_1.default.join(__dirname, 'database.sql');
    console.log('Migrations path:', migrationsPath);
    const migrationsSQL = fs_1.default.readFileSync(migrationsPath, 'utf-8');
    console.log('SQL to execute:', migrationsSQL);
    try {
        yield database_config_1.default.query(migrationsSQL);
        console.log('Migrations ran successfully');
    }
    catch (error) {
        console.error('Error running migrations', error);
    }
    finally {
        yield database_config_1.default.end();
    }
});
migrate();
