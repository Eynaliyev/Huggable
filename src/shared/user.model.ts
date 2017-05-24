interface Contact {
    id: string;
    name: string;
    photoUrl: string;
    age: number;
    lastText: string;
}

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public age: number,
    public photoUrl: string,
    public provider: string, 
    public images: Array<string>,
    public contacts: Contact[]
  ) {  }
}
