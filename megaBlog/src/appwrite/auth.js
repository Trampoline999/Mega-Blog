import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(conf.appWriteProjectId)
      .setEndpoint(conf.appWriteEndpoint);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (newAccount) {
        return this.login({email, password});
      } else {
        return newAccount;
      }
    } catch (error) {
      console.log("Appwrite service createAccount error : ", error);
    }
  }

  async login({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service Login error : ", error);
    }
  }

  async currentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service currentUser error : ", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service logout error : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
