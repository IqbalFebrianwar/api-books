import bcrypt from "bcryptjs"

export const HashPass = async (password : string) => {
    return await bcrypt.hash(password, 10)
}