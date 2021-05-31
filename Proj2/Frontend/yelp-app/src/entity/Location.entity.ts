export default class Location {
    private address: string = "";
    private zipcode: string = "";

    constructor(address: string, zipcode: string) {
        this.address = address;
        this.zipcode = zipcode;
    }
}