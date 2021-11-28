import { Between, getRepository, LessThan, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Category } from "../schemas/Category";
import { Expense } from "../schemas/Expense";
import { User } from "../schemas/User";

interface getExpenseData {
    user_email: string,
    category: string,
    start_date: string,
    end_date: string,
}

interface createExpenseData {
    name: string,
    description: string,
    category: string,
    user_email: string
    amount: number
}

export async function getUserExpenses(data: getExpenseData) {
    try {
        if (!data.user_email) throw Error('Invalid token')
        if (!data.category) throw Error('category field is required')


        const user = await getRepository(User).findOne(data.user_email)
        if (!user) throw Error('no such user');

        const category = await getRepository(Category).findOne(data.category);
        if (!category) throw Error('invalid category');

        const expenseRepo = getRepository(Expense);

        return await expenseRepo.find(
            {
                created_by: user,
                created_at: Between(
                    new Date(data.start_date).toISOString(),
                    new Date(data.end_date).toISOString()
                )
            });

    }
    catch (e: any) {
        throw e;
    }
}

export async function createExpense(data: createExpenseData) {
    try {
        if (!data.name) throw Error('name is required');
        if (!data.category) throw Error('category is required');
        if (!data.amount) throw Error('amount is required')

        const user = await getRepository(User).findOne(data.user_email);

        if (!user) throw 'Invalid user';

        const category = await getRepository(Category).findOne({ name: data.category.toLowerCase(), created_by: user });

        if (!category) throw 'No such category';
        const expense = await getRepository(Expense).save({
            name: data.name,
            description: data.description,
            category: category,
            created_by: user,
            amount: data.amount
        });
        return expense;
    }
    catch (e: any) {
        throw e;
    }


}