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
    public contacts?: Contact[],
    public distance?: number,
    public city?: string,
    public zodiac?: string,
    public job?: string,
    public relationshipStatus?: string,
    public about?: string
  ) {  }
}
