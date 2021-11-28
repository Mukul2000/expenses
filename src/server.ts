import { categoriesRoute } from "./routes/categories";
import { expenseRoute } from "./routes/expenses";
import { usersRoute } from "./routes/users";
import { Category } from "./schemas/Category";
import { Expense } from "./schemas/Expense";
import { User } from "./schemas/User";

const express = require('express');
const { createConnection } = require('typeorm')
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', categoriesRoute)
app.use('/api', expenseRoute)
app.use('/api/users', usersRoute)

createConnection({
    type: 'postgres',
    // username: 'expense',
    // password: 'expense',
    database: 'expense',
    // username: 'klsbjarj',
    // password: 'C-YVXAgMAaHa17NhYfEN6XdonAngN0qQ',
    url: 'postgres://klsbjarj:C-YVXAgMAaHa17NhYfEN6XdonAngN0qQ@castor.db.elephantsql.com/klsbjarj',
    entities: [User, Category, Expense],
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
    // dropSchema: true,
}).then(() => app.listen(8000, () => console.log("Server started on port 8000"))).catch((e: any) => console.log(e))

