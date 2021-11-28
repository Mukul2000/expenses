import { Router } from 'express';
import { createUser, loginUser } from '../controllers/users';

const route = Router()

route.post('/signup', async (req, res) => {

    try {
        const user = await createUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        return res.send(user);
    }
    catch (e: any) {
        console.log(e);
        return res.status(422).send({ 'errors': ['Could not create user', e] });
    }

});

route.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await loginUser(req.body)
        return res.status(200).json({ user })
    } catch (e : any) {
        return res.status(422).json({
            errors: { body: ['Login failed', e.message] }
        })
    }
});



export const usersRoute = route;