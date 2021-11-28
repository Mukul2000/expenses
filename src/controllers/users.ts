import { getRepository } from "typeorm";
import { User } from "../schemas/User";
import { sign } from "../utils/jwt";

interface UserSignupData {
    username: string,
    email: string,
    password: string
}

interface UserLoginData {
    email: string
    password: string
}

export async function createUser(data: UserSignupData) {
    // Check for data validity

    if (!data.username) throw new Error("username is blank")
    if (!data.email) throw new Error("email is blank")
    if (!data.password) throw new Error("password is blank")

    const repo = getRepository(User)

    const existing = await repo.findOne(data.email);

    if (existing) throw new Error("Email already exists")

    try {
        const user = new User()
        user.username = data.username
        user.email = data.email
        user.password = data.password
        const result = await repo.save(user);
        return user;
    }
    catch (e) {
        console.error(e);
        throw e;
    }

}

export async function loginUser(data: UserLoginData): Promise<User> {

    // Check for data validity
    if (!data.email) throw new Error("email is blank")
    if (!data.password) throw new Error("password is blank")

    const repo = getRepository(User)

    // Check if email exists
    const user = await repo.findOne(data.email)

    if (!user) throw new Error('No user with this email id')

    // Check if password matches
    const passmatch = user.password === data.password

    if (passmatch === false) throw new Error('Wrong password')

    user.token = await sign(user)
    return user; 

}