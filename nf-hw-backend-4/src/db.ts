import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kdamir2004:asdasdasd@back.ksoyliz.mongodb.net/?retryWrites=true&w=majority&appName=back" || 'mongodb://localhost:27017/lecture1'
    )
    console.log('MongoDB connected...')
  } catch (err: any) {
    console.error(err.message)
    process.exit(1)
  }
}

export default connectDB
