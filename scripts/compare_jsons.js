// compare-json-diff.js
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ---------- Utilidades de “normalización” -------------------------------

function canonical(value) {
  if (Array.isArray(value)) {
    // No ordenamos: solo convertimos sus elementos a forma canónica
    return value.map(canonical);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b)) // Ordenamos claves
        .map(([k, v]) => [k, canonical(v)])
    );
  }
  return value; // primitivos
}

function elemKey(v) {
  // Clave única para un elemento de array (usamos JSON una vez canonizado)
  return JSON.stringify(canonical(v));
}

// ---------- Algoritmo de diferencias ------------------------------------

function diff(a, b, path = '$') {
  const diffs = [];

  // Ambos arrays → tratarlos como multiconjuntos (orden no importa)
  if (Array.isArray(a) && Array.isArray(b)) {
    const countsA = new Map();
    const countsB = new Map();

    for (const el of a) countsA.set(elemKey(el), (countsA.get(elemKey(el)) || 0) + 1);
    for (const el of b) countsB.set(elemKey(el), (countsB.get(elemKey(el)) || 0) + 1);

    // Elementos solo en A o en B
    const allKeys = new Set([...countsA.keys(), ...countsB.keys()]);
    for (const k of allKeys) {
      const ca = countsA.get(k) || 0;
      const cb = countsB.get(k) || 0;
      if (ca > cb) diffs.push(`${path}: ${ca - cb} elemento(s) sólo en PRIMERO → ${k}`);
      if (cb > ca) diffs.push(`${path}: ${cb - ca} elemento(s) sólo en SEGUNDO → ${k}`);
    }
    return diffs;
  }

  // Tipo distinto (array vs objeto, etc.)
  if (Array.isArray(a) || Array.isArray(b)) {
    diffs.push(`${path}: tipo distinto → ${describe(a)} vs ${describe(b)}`);
    return diffs;
  }

  // Ambos objetos → comparamos claves y luego valores
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const subPath = `${path}.${k}`;
      if (!(k in a)) {
        diffs.push(`${subPath}: falta en PRIMERO, valor en SEGUNDO → ${describe(b[k])}`);
      } else if (!(k in b)) {
        diffs.push(`${subPath}: falta en SEGUNDO, valor en PRIMERO → ${describe(a[k])}`);
      } else {
        diffs.push(...diff(a[k], b[k], subPath));
      }
    }
    return diffs;
  }

  // Primitivos distintos
  if (a !== b) {
    diffs.push(`${path}: valores distintos → ${describe(a)} vs ${describe(b)}`);
  }
  return diffs;
}

function describe(v) {
  return typeof v === 'object' ? JSON.stringify(v) : String(v);
}

// ---------- Programa principal ------------------------------------------

function loadJson(file) {
  return JSON.parse(readFileSync(resolve(process.cwd(), file), 'utf8'));
}

function main() {
  const [fileA, fileB] = process.argv.slice(2);
  if (!fileA || !fileB) {
    console.error('Uso: node compare-json-diff.js <archivo1.json> <archivo2.json>');
    process.exit(1);
  }

  const jsonA = loadJson(fileA);
  const jsonB = loadJson(fileB);

  const differences = diff(jsonA, jsonB);

  if (differences.length === 0) {
    console.log('MATCH: los JSON son equivalentes.');
    process.exit(0);
  } else {
    console.log(`DIFFER: se encontraron ${differences.length} diferencia(s):\n`);
    for (const line of differences) console.log(' •', line);
    process.exit(2);
  }
}

main();
