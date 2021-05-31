import NewUser from '../entity/NewUser.entity';
import User from "../entity/User.entity";
import axios from "axios";


export default class UserController {
   private url: string = "http://localhost:8082/yelp";

   private jsonToEntity = (user: any) => {
       return new User(user.userId, user.username, user.password, user.name);
   }

   private getAllUsersHelper = (): Promise<any> => {
       return axios.get(`${this.url}/user/all`).then((response) => response.data);
   }

   getAllUsers = async () => {
       const getUsers = [await this.getAllUsersHelper()];
       const users = getUsers[0];
    //    console.log(getUsers[0]);
       return users.map((user: any) =>
            this.jsonToEntity(user)
       );
   }

   insertUser = async (user: NewUser) => {
        return await axios.post(`${this.url}/user/insert`, user);
   }


}