// compare-tables.js
import 'dotenv/config.js';
import { Client } from 'pg';

// ---------- Utilidades ----------------------------------------------------

/** Devuelve la lista de columnas de una tabla en orden ordinal */
async function getColumns(client, fullName) {
  const [schema, table] = fullName.includes('.') ? fullName.split('.') : ['public', fullName];

  const { rows } = await client.query(
    `SELECT column_name
       FROM information_schema.columns
      WHERE table_schema = $1 AND table_name = $2
      ORDER BY ordinal_position`,
    [schema, table]
  );
  if (rows.length === 0) {
    throw new Error(`Tabla no encontrada: ${fullName}`);
  }
  return rows.map(r => `"${r.column_name}"`).join(', ');
}

/**
 * Ejecuta una consulta EXCEPT ALL (preserva duplicados).
 * Devuelve true si existen filas distintas y, opcionalmente, las primeras n filas.
 */
async function hasDifferences(client, cols, A, B, n = 10) {
  const query = `
    SELECT * FROM (
      (SELECT ${cols} FROM ${A} EXCEPT ALL SELECT ${cols} FROM ${B})
      UNION ALL
      (SELECT ${cols} FROM ${B} EXCEPT ALL SELECT ${cols} FROM ${A})
    ) diff
    LIMIT ${n};`;
  const { rows } = await client.query(query);
  return rows;
}

// ---------- Programa principal -------------------------------------------

async function main() {
  const [tableA, tableB] = process.argv.slice(2);
  if (!tableA || !tableB) {
    console.error('Uso: node compare-tables.js <tablaA> <tablaB>');
    process.exit(1);
  }

  const client = new Client({ connectionString: process.env.POSTGRES_URL });
  await client.connect();

  try {
    // 1) Asegúrate de que ambas tablas tengan las MISMAS columnas
    const colsA = await getColumns(client, tableA);
    const colsB = await getColumns(client, tableB);
    if (colsA !== colsB) {
      console.log('DIFFER: Las tablas no tienen las mismas columnas.');
      console.log(`  ${tableA}: ${colsA}\n  ${tableB}: ${colsB}`);
      process.exit(2);
    }

    // 2) Busca diferencias (incluye duplicados) con EXCEPT ALL
    const diffs = await hasDifferences(client, colsA, tableA, tableB);

    if (diffs.length === 0) {
      console.log('MATCH: ambas tablas contienen exactamente los mismos datos.');
      process.exit(0);
    } else {
      console.log(`DIFFER: se encontraron diferencias (mostrando hasta ${diffs.length} fila(s)).`);
      console.table(diffs);
      process.exit(2);
    }
  } finally {
    await client.end();
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
