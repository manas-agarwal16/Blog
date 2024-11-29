import { Client, Account, ID } from "appwrite";
import conf from "../../conf/conf.js";

class AuthServices {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteEndPoint) // Replace with your Appwrite endpoint
      .setProject(conf.projectId);

    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    console.log("name : " , name);
    let user;
    try {
      user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("user : " , user);
      if (user) {
        const session = await this.login({email , password});
        console.log("signup session : " , session);
        return {...session , ...user};
      }
    } catch (error) {
      console.log("user : " , user);      
      console.log("User already register try signing in");
      return false;
    }
  }

  async login({ email, password }) {
    console.log("login email : " , email);
    console.log("login password" , password);
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
      
    } catch (error) {
      console.log("Error in logging in user" , error);
      return false;
    }
  }

  async currentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("No active user");
      return false;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Logged out from all sessions successfully");
    } catch (error) {
      console.error("Error logging out from all sessions:", error);
    }
  }
}

export const authServices = new AuthServices();
