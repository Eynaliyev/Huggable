export class Message {
  constructor(
  	public from: string,
    public type: string,
    public time: number,
    public text?: string,
    public picture?: {}
  ) {  }
}
