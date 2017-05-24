interface Contact {
    uid: number;
    name: string;
    photoUrl: string;
    age: number;
}

export class User {
  constructor(
    public uid: number,
    public name: string,
    public email: string,
    public age: number,
    public photoUrl: string,
    public provider: string, 
    public contacts: Contact[]
  ) {  }
}
