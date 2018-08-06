export function testConfirm(msg: string,forceShow:boolean=false): boolean {
  if (process.env.INTERACTIVE || forceShow) {
    return confirm(msg);
  }
  return true;
}
export function testAlert(msg:string,forceShow:boolean=false){
  if (process.env.INTERACTIVE|| forceShow) {
    return alert(msg);
  }
}