#! /usr/bin/env node

// File: account.ts exported to cli.ts / cli.js

// File: cli.ts exported to index.ts / index.js

// File: index.ts
import { CLI } from './cli.js';


const cli = new CLI();
cli.start();


//! note:

/*


In the OOP MyBank project, I have three main files:

account.ts: This file contains the definition of the Account class, which represents a bank account. It includes properties such as balance, accountNumber, and fullName, along with methods for depositing, withdrawing, and retrieving account information.

cli.ts: This file contains the CLI class, which represents the command-line interface for interacting with the bank application. It allows users to create accounts, deposit money, withdraw money, check balances, and view account summaries. It utilizes the inquirer library for user input and provides a structured menu-based interface.

index.ts: This file serves as the entry point of the application. It creates an instance of the CLI class and starts the application by calling the start method. It orchestrates the flow of the application, prompting users to create accounts and then presenting the main menu for interacting with their accounts.

Overall, these files work together to create a simple banking application with object-oriented principles, providing users with the ability to manage their accounts via a command-line interface.

*/