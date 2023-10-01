import app from './app'

const port = Number(process.env.APP_PORT)

app.listen({ port, host: '0.0.0.0' }, err => {
  if (err) app.log.error(err)
})
