export default class User {
    private id: string = "";
    private username: string = "";
    private password: string = "";
    private name: string = "";

    constructor(id: string, username: string, password: string, name: string) {
        this.setId(id);
        this.setUsername(username);
        this.setPassword(password);
        this.setName(name);
    }

    getId = () => this.id;
    setId = (id: string) => this.id = id;

    getUsername = () => this.username;
    setUsername = (username: string) => this.username = username;

    getPassword = () => this.password;
    setPassword = (password: string) => this.password = password;

    getName = () => this.name;
    setName = (name: string) => this.name = name;

    toJSON = (includeId?: boolean) => {
        if(includeId) {
            return {
                id: this.getId(),
                username: this.getUsername(),
                password: this.getPassword(),
                name: this.getName(), 
            }
        }
        return {
            username: this.getUsername(),
            password: this.getPassword(),
            name: this.getName(),
        }
    }
}