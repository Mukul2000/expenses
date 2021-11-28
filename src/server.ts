import { Category } from "./schemas/Category";
import { Expense } from "./schemas/Expense";
import { User } from "./schemas/User";

const express = require('express');
const { createConnection } = require('typeorm')

const app = express();

createConnection({
    type: 'postgres',
    username: 'expense',
    password: 'expense',
    database: 'expense',
    entities: [User, Category, Expense],
    synchronize: true,
    logging: true,
    logger: 'advanced-console'

}).then(() => app.listen(8000, () => console.log("Server started on port 8000"))).catch((e: any) => console.log(e))

