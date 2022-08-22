import { Configuration } from "../config/Configuration";
import { AccountResponse, AccountResponseItem } from "../modal/Account";
import { BankModal } from "../modal/bank";

export class AccountService {
    baseUrl: string;

    constructor() {
        this.baseUrl = Configuration.baseUrl;
    }

    public fetchAccounts(bankId: string): Promise<AccountResponse> {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}account/${bankId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    public addAccount(userId: string, bodyData: {account:AccountResponseItem , bank: BankModal}): Promise<AccountResponseItem> {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}account/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'user-id': userId,
                },
                body: JSON.stringify(bodyData),
            })
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    }

    public updateAccount(accountId: string, bankId: string, body: AccountResponseItem): Promise<AccountResponseItem>{
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}account/${accountId}/${bankId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
            })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    // public getBankById(id: string, userId: string): Promise<BankModal> {
    //     return new Promise((resolve, reject) => {
    //         fetch(`${this.baseUrl}bank/${id}`, {
    //             headers: {
    //                 'user-id': userId,
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             }
    //         })
    //         .then(res=> res.json())
    //         .then(res => resolve(res))
    //         .catch(err => reject(err));
    //     });
    // }

    // public addBank(bank: BankModal): Promise<BankModal>{
    //     return new Promise((resolve, reject) => {
    //         fetch(`${this.baseUrl}bank/`, {
    //             method: 'POST',
    //             body: JSON.stringify(bank),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //         })
    //         .then(function(res) {    
    //             if(res.ok)
    //             {
    //               return res.json();         
    //             }
    //             throw new Error(res.statusText);
    //         }) 
    //         .then(res => {
    //             resolve(res)
    //         })
    //         .catch(err => {
    //             reject(err);
    //         });
    //     })
    // }

    // updateBank(bank: BankModal, id: string , userId: string| undefined): Promise<BankModal>{
    //     return new Promise((resolve, reject) => {
    //         fetch(`${this.baseUrl}bank/${id}`, {
    //             headers: {
    //                 'user-id': userId? userId: '',
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //             method: 'PUT',
    //             body: JSON.stringify(bank),
    //         })
    //         .then(res=> res.json())
    //         .then(res => resolve(res))
    //         .catch(err => reject(err));
    //     })
    // }

    // deleteBank(id: string, userId: string| undefined): Promise<ResponseDelete>{
    //     return new Promise((resolve, reject) => {
    //         fetch(`${this.baseUrl}bank/${id}`, {
    //             headers: {
    //                 'user-id': userId? userId: '',
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //             method: 'DELETE'
    //         })
    //         .then(res=> res.json())
    //         .then(res => resolve(res))
    //         .catch(err => reject(err));
    //     })
    // }
}