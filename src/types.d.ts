declare module 'react-xml-viewer';
// declare module 'xml2js';

interface Search {
    DateInterval: IDateInterval
    SearchContext: ISearchContext

}



interface ISearchContext {
    targetSearchEntitiesContext: ITargetSearchEntitiesContext


}


enum Tonalyty { 'any', 'negative', 'positive' }

interface ITargetSearchEntitiesContext {

    targetSearchEntities: ITargetSearchEntity[],
    onlyMainRole: boolean //	Главная роль в отношении целевых объектов:
    // true — выдаются только публикации, в которых целевой объект упоминается в главной роли;
    // false — наличие или отсутствие главной роли не проверяется.
    onlyWithRiskFactors: boolean //	Наличие риск-факторов в отношении целевых объектов:
    // true — выдаются только публикации, в которых целевой объект упоминается в контексте какого-либо риск-фактора;
    // false — наличие или отсутствие риск-факторов не проверяется.
    tonality: string	//Тональность упоминаний в отношении целевых объектов. Одно значение из списка:

    riskFactors?: any,	// В рамках данного проекта не используется.
    themes?: any //В рамках данного проекта не используется.
}






interface ITargetSearchEntity {




    type: 'company' | 'suggestedPersons'	// Одно значение из списка:
    // company — компания;
    // suggestedPersons — персона.
    // В рамках данного проекта нужно использовать значение company.


    inBusinessNews: boolean | null
    // Фильтр по наличию или отсутствию бизнес-контекста вокруг объекта:
    // true — выдаются только новости, где объект упоминается в бизнес-контексте (деловые темы);
    // false — выдаются только новости, где объект упоминается не в бизнес-контексте (например, новости культуры, спорта, упоминание банка для указания его реквизитов);
    // null — фильтр не применяется.
    sparkId: number | null //	Код СПАРК юридического лица.
    entityId: number | null	// Идентификатор по каталогу объектов СКАН.
    inn: number	// ИНН юридического лица.
    maxFullness: boolean	 //Подход к поиску — признак максимальной полноты.Применяется только при поиске по sparkId или inn.
    // Одно значение из списка:
    // false — выдача только результатов с высокой точностью(поиск с учётом контекста);
    // true — выдача результатов с высокой полнотой(объединяются результаты поиска с учётом контекста и поиска по похожим названиям).
}

interface IDateInterval {
    startDate: string	// Дата начала периода запроса. Формат yyyy-mm-dd. Обязательное.
    endDate: string	//Дата окончания периода запроса. Формат yyyy-mm-dd. Обязательное.
}

type StepInterval = 'day' | 'week' | 'month' | 'quarter' | 'year'
// day — день;
// week — неделя;
// month — месяц;
// quarter — квартал;
// year — год.
// Для целей данного проекта необходимо отправлять значение month.

type HistogramTypes = 'totalDocuments' | 'riskFactors'
// Для целей данного проекта необходимо отправлять оба значения.




interface IHistogrammRequesBody {
    intervalType: StepInterval,
    histogramTypes: HistogramTypes[],
    issueDateInterval: Search.DateInterval
    searchContext: ISearchContext
    similarMode: 'none' | 'duplicates' 	//Фильтр похожих публикаций.Одно значение из списка:
    // none — без фильтрации, в выдачу включаются все публикации;
    // duplicates — фильтр по дубликатам, в выдачу включается по одной публикации из каждого кластера дублей.
    // Выберите любое из значений на ваше усмотрение.

    limit: number //	Количество возвращаемых публикаций.Значение от 1 до 1000.
    sortType: 'issueDate' | 'sourceInfluence'	//	Тип сортировки.Одно значение из списка:
    // issueDate — дата публикации;
    // sourceInfluence — вес источника.
    // Выберите любое из значений на ваше усмотрение.

    sortDirectionType: 'desc' | 'asc' 	//	Направление сортировки.Одно значение из списка:
    // desc – по убыванию;
    // asc – по возрастанию.
    // Выберите любое из значений на ваше усмотрение.


    attributeFilters?: any //	Объект типа Filter.Attributes	Фильтр по атрибутам публикаций.
    // searchArea	В рамках данного проекта не используется.


}


interface IHistogrammResponse {
    data: IHustogramm[]
}

interface IHustogramm {

    data: IIntervalPoint[]
    histogramType: 'totalDocuments' | 'riskFactors'

}

interface IIntervalPoint {
    date: string //	Дата и время начала периода.
    value: number //	Количество публикаций.
}


interface SearchResultItem {
    encodedId: string	//Идентификатор публикации.
    influence: number	// Вес источника публикации.
    similarCount: number	//Количество похожих публикаций. Актуально только при поиске с группировкой выдачи по кластерам дублей.
}

interface IObjectsearch {
    items: SearchResultItem[] //	Массив объектов типа SearchResultItem.Список найденных публикаций.
    mappings?: any	//В рамках данного проекта не используется.

}


interface IScanDoc {
    schemaVersion: string	// Версия формата публикации.
    id: string	// ID публикации.
    version: number //Dерсия данных внутри документа.
    issueDate: date //Дата и время публикации.
    url: string	 //Ссылка на страницу оригинала публикации.
    author: {
        name: string
    } //	Автор публикации.
    source: Source //	Источник публикации.
    dedupClusterId: string	// ID кластера дубликатов.
    title: {
        text: string	// Текст заголовка без разметки.
        markup: string	// Текст заголовка с лингвистической XML-разметкой.
    } //	Заголовок публикации.
    content: {
        markup: string	//Текст публикации с лингвистической XML-разметкой.
    } //	Содержимое документа.
    entities?: any //	В рамках данного проекта не используется.
    attributes: Attributes  //Дополнительные атрибуты публикации.
    language: string	// Язык публикации. Возможные значения:
}


interface Source {
    id: number //ID источника.
    name: string //Наименование источника.
    categoryId: number	 //integer	ID категории источника.
    levelId: number  // integer	ID уровня источника.
    groupId: number	//integer	ID группы источника.
}

interface Attributes {
    isTechNews: boolean	//Признак того, что публикация является технической новостью.
    isAnnouncement: boolean//	Признак того, что публикация является анонсом или календарём событий.
    isDigest: boolean	//Признак того, что публикация является дайджестом, то есть сводкой новостей.
    wordCount: number	//Количество слов текста публикации.
    influence?: any //	В рамках данного проекта не используется.
    coverage?: any	//В рамках данного проекта не используется.
}



interface IDocumentsResponse {
    ok: IScanDoc
    fail?: {
        errorCode: string
        errorMessage: string
    }
}

