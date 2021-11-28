import { getRepository } from "typeorm"
import { Category } from "../schemas/Category"
import { User } from "../schemas/User";

interface createCategoryData {
    name: string
    user_email: string
}

interface userCategories {
    email: string
}

export async function createCategory(data: createCategoryData) {
    if (!data.name) throw 'name field is invalid'
    const categoryRepo = getRepository(Category);
    const userRepo = getRepository(User)


    const existsC = await categoryRepo.findOne(data.name);
    const user = await userRepo.findOne(data.user_email)

    if (!user) throw 'no such user'
    if (existsC) throw 'Category already exists';
    try {

        const result = await categoryRepo.save({
            name: data.name.toLowerCase(),
            created_by: user
        });
        return result;

    }
    catch(e) {
        console.log(e);
        throw e;
    } 

}

export async function getUserCategories(data : userCategories) {
    if(!data.email) throw "email is invalid";

    const results = await getRepository(Category).find();

    return results;
}