import mongoose, { Document, Schema } from 'mongoose'

export interface IArtist extends Document {
  prof: string
  name: string
  img: string
}

const ArtistSchema: Schema = new Schema({
  name: { type: String, required: true },
  prof: { type: String, required: true },
  img: { type: String, required: true }
})

export default mongoose.model<IArtist>('Artist', ArtistSchema)
