import pg from 'pg';
const { Client } = pg;

const client = new Client({ 
  connectionString: process.env.DATABASE_URL 
});

async function dropAll() {
  await client.connect();
  console.log('Connexion à la base de données...');
  
  await client.query('DROP SCHEMA public CASCADE');
  console.log('Schema public supprimé');
  
  await client.query('CREATE SCHEMA public');
  console.log('Schema public recréé');
  
  await client.query('GRANT ALL ON SCHEMA public TO public');
  console.log('Permissions accordées');
  
  console.log('✅ Base de données vidée avec succès');
  await client.end();
}

dropAll().catch(e => { 
  console.error('❌ Erreur:', e.message); 
  process.exit(1); 
});
