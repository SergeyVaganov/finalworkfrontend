
export interface IInfo {
    eventFiltersInfo: {
        usedCompanyCount: number,
        companyLimit: number
    }
}

export const getInfo = async (token: string): Promise<IInfo> => {

    const response = await fetch("https://gateway.scan-interfax.ru/api/v1/account/info", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.status === 200) {
        const result = await response.json()
        return result
    }
    if (response.status === 401) {
        const result = await response.json()

        throw new Error(result.message)
    }
    throw new Error('Ошибка входа в систему')
}
