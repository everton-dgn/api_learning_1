import app from './app.js'

const port = Number(process.env.APP_PORT)

app.listen({ port }, err => {
  if (err) app.log.error(err)
})
