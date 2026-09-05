import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Minimal file-backed store. One JSON file per collection under `data/`.
 * Single Node process only: writes to a collection are serialised through an
 * in-process promise chain, and each write goes to a temp file that is then
 * atomically renamed into place.
 *
 * On a persistent host (VPS) this keeps data across restarts. On a read-only
 * serverless host it falls back to `/tmp` (ephemeral — data resets between
 * cold starts). Set DATA_DIR to override.
 */

const DATA_DIR =
  process.env.DATA_DIR ||
  (process.env.VERCEL
    ? "/tmp/lcdlv-data"
    : path.join(process.cwd(), "data"));

const chains = new Map<string, Promise<unknown>>();

function serialise<T>(key: string, task: () => Promise<T>): Promise<T> {
  const previous = chains.get(key) ?? Promise.resolve();
  const run = previous.then(task, task);
  chains.set(
    key,
    run.then(
      () => undefined,
      () => undefined,
    ),
  );
  return run;
}

async function readFile<T>(name: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${name}.json`), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeFile<T>(name: string, rows: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, `${name}.json`);
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
  await fs.rename(tmp, target);
}

export type Row = { id: string };

export type Collection<T extends Row> = {
  all(): Promise<T[]>;
  find(predicate: (row: T) => boolean): Promise<T | null>;
  insert(row: T): Promise<T>;
  update(id: string, patch: Partial<Omit<T, "id">>): Promise<T | null>;
  remove(id: string): Promise<boolean>;
};

export function collection<T extends Row>(name: string): Collection<T> {
  return {
    all: () => serialise(name, () => readFile<T>(name)),

    async find(predicate) {
      const rows = await serialise(name, () => readFile<T>(name));
      return rows.find(predicate) ?? null;
    },

    insert: (row) =>
      serialise(name, async () => {
        const rows = await readFile<T>(name);
        rows.push(row);
        await writeFile(name, rows);
        return row;
      }),

    update: (id, patch) =>
      serialise(name, async () => {
        const rows = await readFile<T>(name);
        const index = rows.findIndex((row) => row.id === id);
        if (index === -1) return null;
        rows[index] = { ...rows[index], ...patch } as T;
        await writeFile(name, rows);
        return rows[index];
      }),

    remove: (id) =>
      serialise(name, async () => {
        const rows = await readFile<T>(name);
        const next = rows.filter((row) => row.id !== id);
        if (next.length === rows.length) return false;
        await writeFile(name, next);
        return true;
      }),
  };
}
