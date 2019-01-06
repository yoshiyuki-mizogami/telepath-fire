export default async function messageConverter(baseData:any){
  const sender = await baseData.sender.get()
  baseData.sender = sender.data()
  baseData.sentAt = baseData.sentAt.toDate()
  if(!baseData.files){
    baseData.files = []
  }
  return baseData
}