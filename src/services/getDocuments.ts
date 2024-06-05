
export const getDocuments = async (token: string, ids: string[]): Promise<IDocumentsResponse[]> => {
    const responseDocs = await fetch("https://gateway.scan-interfax.ru/api/v1/documents", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
    })
    if (responseDocs.status === 200) {
        const result = await responseDocs.json()
        return result
    }
    if (responseDocs.status === 401) {
        const result = await responseDocs.json()
        throw new Error(result.message)
    }
    throw new Error('Что то пошло не так')
}
