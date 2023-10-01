import sql from './db.js'

// sql`DROP TABLE IF EXISTS videos;`.then(() => {
//   console.log('Table dropped')
// })

sql`
  CREATE TABLE videos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL
  );
`.then(() => {
  console.log('Table created')
})
