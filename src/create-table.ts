import sql from './db'

// sql`DROP TABLE IF EXISTS videos;`.then(() => {
//   console.log('Table dropped')
// })

// eslint-disable-next-line @typescript-eslint/no-floating-promises
void sql`
  CREATE TABLE videos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL
  );
`.then(() => {
  // eslint-disable-next-line no-console
  console.log('Table created')
})
