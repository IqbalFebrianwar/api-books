import fs from 'fs';
import path from 'path';
import pool from './database-config';

const migrate = async () => {
  const migrationsPath = path.join(__dirname, 'database.sql');
  console.log('Migrations path:', migrationsPath);

  const migrationsSQL = fs.readFileSync(migrationsPath, 'utf-8');
  console.log('SQL to execute:', migrationsSQL);


  try {
    await pool.query(migrationsSQL);
    console.log('Migrations ran successfully');
  } catch (error) {
    console.error('Error running migrations', error);
  } finally {
    await pool.end();
  }
};

migrate();
