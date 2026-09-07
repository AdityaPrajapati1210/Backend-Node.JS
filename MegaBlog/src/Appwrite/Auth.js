import conf from '../../conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (conf.appwriteUrl) {
            this.client.setEndpoint(conf.appwriteUrl);
        }
        if (conf.appwriteProjectId) {
            this.client.setProject(conf.appwriteProjectId);
        }
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            // If there is an active session from a previous user, clear it first
            try {
                await this.account.deleteSessions();
            } catch {
                // No active session or delete failed, safe to proceed
            }

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // If a session is already active (code 409), delete previous sessions and retry
            if (error?.code === 409 || error?.message?.toLowerCase().includes("session is active")) {
                try {
                    await this.account.deleteSessions();
                    return await this.account.createEmailPasswordSession(email, password);
                } catch (retryError) {
                    console.log("Appwrite service :: login retry :: error", retryError);
                    throw retryError;
                }
            }
            console.log("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error?.code !== 401) {
                console.log("Appwrite service :: getCurrentUser :: error", error);
            }
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;