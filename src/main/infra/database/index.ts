import { PrismaClient } from "@prisma/client";
import { execFileSync } from "child_process";
import { app } from "electron";
import path from "path";
import { getRootDir } from "../../../root-dir";
import { isDev } from "../utils/environment/is-dev";

export abstract class PrismaClientFactory {

    public static create() {

        const prismaClient = new PrismaClient({
            log: isDev() ? ['error', 'warn', 'info', 'query' ] : undefined,
        });

        return prismaClient;
    }
}

export abstract class Database {

    private static getDatabaseFilename() {

        if (isDev())
            return path.resolve(getRootDir(), '..', '..', '.prisma', 'dev-db.sqlite');

        return path.join(app.getPath('userData'), 'app-data', 'db.sqlite');
    }

    public static async runMigrations() {

        process.env.DATABASE_URL = 'file:' + Database.getDatabaseFilename();

        console.log('Running migrations...');

        const prismaPath = path.resolve(getRootDir(), "..", "..", "node_modules/prisma/build/index.js");
        const prismaSchemaPath = isDev() ? path.resolve(__dirname, "..", "..", ".prisma", "schema.prisma") : path.resolve(__dirname, "schema.prisma");

        // console.log('Prisma Path: ' + prismaPath);
        // console.log('Schema: ' + prismaSchemaPath);
        // console.log('Database url: ' + process.env.DATABASE_URL);

        const output = execFileSync('node', [prismaPath, 'migrate', 'deploy', '--schema', prismaSchemaPath], {
            env: {
                ...process.env,
                DATABASE_URL: process.env.DATABASE_URL
            }
        });

        // console.log('\n\n========= PRISMA OUTPUT =================\n\n');
        // console.log(output.toString());
        // console.log('\n\n==========================================\n\n');

        console.log('Migrations runned successfully');
    }
}