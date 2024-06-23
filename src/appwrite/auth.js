// THIS IS THE SERVICE FILE FOR APPWRITE AND IT HOLDS ALL THE DB SERVICES
// WHICH WILL APPLICABLE TO ANY FUTURE APPWRITE CONFIGURATION IN THE SAME WAY

import config from "../config/config";
import {Client,Account,ID} from "appwrite";

// Resources will be used only when object of the class will be created.
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //will call login method
                return this.login({email,password});
            }else{
               return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: Error", error);
        }
        return null;
    }
    
    async logOut(){ 
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logOut :: Error", error);
        }
    }
}
const authService=new AuthService();
export default authService