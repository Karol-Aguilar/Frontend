import { defineNitroPlugin } from '#imports'
import { fromNodeMiddleware } from 'h3'
import expressApp from '../express' // Importa Express desde `server/express.ts`

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', fromNodeMiddleware(expressApp))
})
