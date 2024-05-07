#! /usr/bin/env node
// File: cli.ts
import chalk from "chalk";
import inquirer from 'inquirer';
import { Account } from './account.js';
console.log(chalk.yellowBright.italic.bold("\n🟠🟢🔵 Dear valued customer, A good day to you! 🔵🟢🟠\n"));
export class CLI {
    account;
    constructor() {
        this.account = null;
    }
    async start() {
        console.log(chalk.yellowBright.italic.bold("🟠🟢🔵 Welcome & Thank you to login My Bank Ltd.🔵🟢🟠 \n"));
        await this.createAccount();
        await this.showMenu();
    }
    async createAccount() {
        const fullNameResponse = await inquirer.prompt({
            type: 'input',
            name: 'fullName',
            message: chalk.italic.bold.rgb(255, 0, 255)('Enter your full name:')
        });
        const fullName = fullNameResponse.fullName;
        // Ensure full name contains only alphabets
        if (!/^[A-Za-z\s]+$/.test(fullName)) {
            console.log(chalk.italic.bold.rgb(255, 56, 0)("Full name must contain only alphabets"));
            return await this.createAccount();
        }
        this.account = new Account(fullName);
        console.log(chalk.italic.bold.rgb(57, 255, 20)(`Account created successfully for ${this.account.getFullName()} with account number ${this.account.getAccountNumber()}`));
    }
    async showMenu() {
        if (!this.account) {
            console.log(chalk.italic.bold.rgb(255, 56, 0)("No account found. Please create an account first."));
            return;
        }
        const { choice } = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: chalk.yellowBright.italic.bold('\nSelect an option:'),
            choices: [
                'Deposit',
                'Withdraw',
                'Check Balance',
                'Summary',
                'Exit'
            ]
        });
        switch (choice) {
            case 'Deposit':
                let depositAmount;
                do {
                    const depositResponse = await inquirer.prompt({
                        type: 'input',
                        name: 'amount',
                        message: chalk.italic.bold.rgb(255, 0, 255)('Enter deposit amount:')
                    });
                    depositAmount = parseFloat(depositResponse.amount);
                    if (isNaN(depositAmount)) {
                        console.log(chalk.italic.bold.rgb(255, 56, 0)("Please enter a valid numerical amount."));
                    }
                } while (isNaN(depositAmount));
                this.account.deposit(depositAmount);
                console.log(chalk.italic.bold.rgb(57, 255, 20)("Amount deposited successfully"));
                break;
            case 'Withdraw':
                let withdrawAmount;
                do {
                    const withdrawResponse = await inquirer.prompt({
                        type: 'input',
                        name: 'amount',
                        message: chalk.italic.bold.rgb(255, 0, 255)('Enter withdrawal amount:')
                    });
                    withdrawAmount = parseFloat(withdrawResponse.amount);
                    if (isNaN(withdrawAmount)) {
                        console.log(chalk.italic.bold.rgb(255, 56, 0)("Please enter a valid numerical amount."));
                    }
                } while (isNaN(withdrawAmount));
                this.account.withdraw(withdrawAmount);
                break;
            case 'Check Balance':
                console.log(chalk.italic.bold.rgb(57, 255, 20)("Your balance: " + " " + this.account.getBalance()));
                break;
            case 'Summary':
                console.log(chalk.italic.bold.rgb(255, 0, 255)("Account Summary:"));
                console.log(chalk.italic.bold.rgb(57, 255, 20)("Name:" + " " + this.account.getFullName()));
                console.log(chalk.italic.bold.rgb(57, 255, 20)("Account Number:" + " " + this.account.getAccountNumber()));
                console.log(chalk.italic.bold.rgb(57, 255, 20)("Balance:" + " " + this.account.getBalance()));
                break;
            case 'Exit':
                console.log(chalk.italic.bold.rgb(255, 0, 255).underline("\n 🌟 Exiting... Thank you for choosing My Bank Ltd. 🌟 "));
                console.log(chalk.italic.bold.rgb(255, 0, 255)("\nAuthor: Azmat Ali"));
                return;
            default:
                console.log("Invalid choice");
        }
        await this.showMenu();
    }
}
