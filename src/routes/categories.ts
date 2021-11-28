import { response, Router } from "express"
import { authByToken } from "../middlewares/auth"
import { createCategory, getUserCategories } from "../controllers/categories";
const route = Router()

route.post('/categories', authByToken, async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            user_email: (req as any).user.email
        }
        const category = await createCategory(data);
        return res.send(category)
    }
    catch (e: any) {
        console.log(e);
        return res.status(422).send({ 'errors': ['error creating category', e.message] });
    }
});

route.get('/categories', authByToken, async (req, res) => {
    try {
        const data = {
            email: (req as any).user.email
        }
        const results = await getUserCategories(data);
        return res.send(results);
    } catch (e: any) {
        console.log(e);
        return res.status(422).send({ 'errors': ['error fetching categories', e.message] });
    }
})

export const categoriesRoute = route;