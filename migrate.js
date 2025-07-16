import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importa a configuração do banco de dados (se você tiver uma)
// Ou use a string de conexão diretamente.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not defined.');
  process.exit(1);
}

const sequelize = new Sequelize(connectionString, {
  // Configurações do Sequelize, se houver
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Acessa o sequelize-cli programaticamente
const { Umzug, SequelizeStorage } = await import('umzug');

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, 'src', 'database', 'migrations', '*.js'),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await umzug.up();
    console.log('Migrations finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migrations failed:', error);
    process.exit(1);
  }
}

runMigrations();