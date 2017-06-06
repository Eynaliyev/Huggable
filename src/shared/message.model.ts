export class Message {
  constructor(
  	public from: string,
    public type: string,
    public time: any,
    public text?: string,
    public picture?: string
  ) {  }
}
