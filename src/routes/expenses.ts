import { Router } from 'express';
import { getUserExpenses, createExpense } from '../controllers/expenses';
import { authByToken } from '../middlewares/auth';
const route = Router();
import url from 'url';


route.get('/expenses', authByToken, async (req, res) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        const data = {
            user_email: (req as any).user.email,
            category: queryObject.category as string,
            start_date: queryObject.start_date as string,
            end_date: queryObject.end_date as string
        }
        const results = await getUserExpenses(data);

        return res.send(results);
    }
    catch (e: any) {
        console.log(e);
        return res.status(422).send({ 'errors': ['error fetching data', e.message] });
    }
});

route.post('/expenses', authByToken, async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user_email: (req as any).user.email,
            amount: parseFloat(req.body.amount)
        }
        console.log(data)
        const result = await createExpense(data)
        
        return res.send(result);
    }
    catch (e: any) {
        console.log(e);
        return res.status(422).send({ 'errors': ['error creating expense', e.message] });
    }
});

export const expenseRoute = route;