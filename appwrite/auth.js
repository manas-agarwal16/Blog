import {Client , Account , ID} from "appwrite";
import conf from "../conf/conf.js";

class AuthServices{
    client;
    account;
    constructor() {
        this.client = new Client().setEndpoint(conf.appwriteEndPoint) // Replace with your Appwrite endpoint
        .setProject(conf.projectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({name , email , password}){
        try {
           const user =  await this.account.create(ID.unique(), email, password , name);
           if(user){
            return this.login({email , password});
           }
           else{
            return "Error in creating user account";
           }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async currentUser(){
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
            console.log('Logged out from all sessions successfully');
        } catch (error) {
            console.error('Error logging out from all sessions:', error);
        }
    }
}

export const authService = new AuthServices();