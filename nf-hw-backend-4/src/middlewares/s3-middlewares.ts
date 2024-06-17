import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

export const s3 = new S3({
  region: "us-east-1"!,
  credentials: {
    accessKeyId: "KIAVRUVVSNNC6YKIKBZ"!,
    secretAccessKey: "/z3ENYq2TKXdao1/aqHuGByYh2l+1u1pUUYWY3/"!
  }
})

export const listBuckets = async () =>
  await s3
    .listBuckets()
    .then((res) => res.Buckets)
    .catch((err) => console.log(`Error listing buckets: ${err.Code}`))

export const createBucket = async (Bucket: string) =>
  await s3
    .createBucket({ Bucket })
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error creating a bucket: ${err.Code}`))

export const deleteBucket = async (Bucket: string) =>
  await s3
    .deleteBucket({ Bucket })
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error deleting a bucket: ${err.Code}`))

export const uploadFile = async (Bucket: string, name: string, file: Buffer) =>
  await new Upload({
    client: s3,
    params: {
      Bucket,
      Key: name,
      Body: file,
      ACL: 'public-read'
    }
  })
    .done()
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error uploading a file: ${err.Code}`))

export const updateFile = async (Bucket: string, name: string, file: Buffer) =>
  await s3
    .putObject({
      Bucket,
      Key: name,
      Body: file
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error updating a file: ${err.Code}`))

export const deleteFile = async (Bucket: string, name: string) =>
  await s3
    .deleteObject({ Bucket, Key: name })
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error deleting a file: ${err.Code}`))