import { Message } from './message.model';
import { User } from './user.model';

export class Room {
  constructor(
    public id: string,
    public messages: Message[],
    public guysWaitlist: string[],
    public girlsWaitlist: string[],
    public location: Array<number>,
    public menNum: number,
    public womenNum: number,
    public members: User[]
  ) {  }
}
