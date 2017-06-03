export interface Contact {
    id: string;
    name: string;
    photoUrl: string;
    age?: number;
    lastText?: string;
}

export class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public photoUrl: string,
    public provider: string, 
    public age?: number,
    public images?: Array<string>,
    public about?: string,
    public contacts?: Contact[]
  ) {  }
}
