export class User {
    isLoggedIn: Boolean;
    username: string;

    constructor(isLoggedIn : Boolean, username : string) {
        this.isLoggedIn = isLoggedIn;
        this.username = username;
    }
}