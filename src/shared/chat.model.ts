import { Message } from './message.model';

export class Chat {
  constructor(
    public id: Array<string>,
    public messages: Message[]
  ) {  }
}
