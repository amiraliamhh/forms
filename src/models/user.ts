import { PoolClient, QueryResult } from "pg";
import { genSalt, hash } from 'bcryptjs'

import { IResponseGlobalOptions } from "../types";
import { validateEmail, validatePhoneNumber, validatePassword, logError } from "../utils";

interface IUser {
    id: number
    first_name?: string|null
    last_name?: string|null
    email: string
    phone_number?: string|null
    password: string
}

class User {
    constructor(private pool: PoolClient) {
        
    }

    public async create(user: IUser, gOptions?: IResponseGlobalOptions): Promise<QueryResult> {
        const validationError = this.validateUser(user, gOptions ? gOptions.lang || 'fa' : 'fa')
        if (validationError) {
            throw new Error(validationError)
        }

        try {
            const salt = await genSalt(10)
            const hashedPass = await hash(user.password, salt)
            const {
                first_name=null,
                last_name=null,
                email,
                phone_number=null,
                password
            }: IUser = Object.assign(user, { password: hashedPass })
    
            const dbResponse = await this.pool.query(`
                INSERT INTO users(
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    password
                ) VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `, [first_name, last_name, email, phone_number, password])

            return dbResponse

        } catch (err) {
            throw new Error(err)
        }
    }

    public async findOneWithEmail(email: string) {
        try {
            const dbResponse = await this.pool.query(`
                SELECT email, password FROM users WHERE email=$1;
            `, [email])
    
            return dbResponse.rows[0]

        } catch (err) {
            logError(err)
            throw new Error(err)
        }
    }

    private validateUser(user: IUser, lang:'fa'|'en'='fa'): string {
        const emailValidation = validateEmail(user.email, lang)
        if (emailValidation !== true) {
            return String(emailValidation)
        }

        const passwordValidation = validatePassword(user.password, lang)
        if (passwordValidation !== true) {
            return String(passwordValidation)
        }

        if (user.phone_number) {
            const phoneNumberValidation = validatePhoneNumber(user.phone_number, lang)
            if (phoneNumberValidation !== true) {
                return String(phoneNumberValidation)
            }
        }

        return ''
    }
}

export default User
