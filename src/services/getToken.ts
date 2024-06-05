import { SignInSchemaType } from '../components/SignInForm/SignInForm'


interface IAccessToken {
    accessToken: string
    expire: string
    login: string
}


export const getToken = async (password: SignInSchemaType): Promise<IAccessToken> => {

    const response = await fetch("https://gateway.scan-interfax.ru/api/v1/account/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(password)
    })
    if (response.status === 200) {
        const result = await response.json()
        result.login = password.login
        return result
    }
    if (response.status === 401) {
        const result = await response.json()
        throw new Error(result.message)
    }

    throw new Error('Ошибка входа в систему')
}
