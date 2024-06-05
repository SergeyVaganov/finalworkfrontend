
export const getHistogramm = async (token: string, data: IHistogrammRequesBody): Promise<IHistogrammResponse> => {
    const responseHist = await fetch("https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    if (responseHist.status === 200) {
        const result = await responseHist.json()
        return result
    }
    if (responseHist.status === 401) {
        const result = await responseHist.json()
        throw new Error(result.message)
    }
    throw new Error('Что то пошло не так')
}




