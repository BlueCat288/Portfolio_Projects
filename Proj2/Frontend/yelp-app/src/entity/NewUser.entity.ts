export default class NewUser {
    private username: string = "";
    private password: string = "";
    private name: string = "";

    constructor(username: string, password: string, name: string) {
        this.username = username;
        this.password = password;
        this.name = name;
    }
}