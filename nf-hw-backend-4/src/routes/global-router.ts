import { Router } from 'express'
import authRouter from './auth/auth-router'
import songRouter from './songs/songRouter'
import albumRouter from './albums/album-router'
import artistRouter from './artists/artist-router'
import PlaylistRouter from './playlist/playlist-router'
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/songs', songRouter)
globalRouter.use('/albums', albumRouter)
globalRouter.use('/artists', artistRouter)
globalRouter.use('/playlist', PlaylistRouter)
// other routers can be added here

export default globalRouter