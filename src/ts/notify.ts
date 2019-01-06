import globals from './globals'
class Notify{
  private prevent:boolean = false
  constructor(){
    Notification.requestPermission()
  }
  pop(body:string):void{
    if(this.prevent){
      return
    }
    const notify = new Notification('Receive new message',{
      icon:'favicon.png',
      body
    })
    setTimeout(()=>{
      notify.close()
    },globals.NOTIFY_TIMEOUT)
  }
  setPrevent(bo : boolean){
    this.prevent = bo
  }
}

export default new Notify()