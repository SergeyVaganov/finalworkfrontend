
export const getObjectsearch = async (token: string, data: IHistogrammRequesBody): Promise<IObjectsearch> => {

    const responseObject = await fetch("https://gateway.scan-interfax.ru/api/v1/objectsearch", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)

    })
    if (responseObject.status === 200) {
        const result = await responseObject.json()
        return result
    }
    if (responseObject.status === 401) {
        const result = await responseObject.json()

        throw new Error(result.message)
    }

    throw new Error('Что то пошло не так')
}
