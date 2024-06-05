import { FunctionComponent } from 'react'
import z from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import style from './RequestForm.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks/hooksStore';
import { fetchHistogrum } from '../../store/slices/hustoSlice'
import { useNavigate } from 'react-router-dom';


const schemaForm = z.object(
    {
        inn: z.coerce.number({ message: 'ИНН дожлен содержать только цыфры' }).
            max(9999999999, { message: 'цифр должно быть не больше 10' }).
            min(1000000000, { message: 'цифр должно быть не меньше 10' }).
            refine((val) => {
                const arrayInn = Array.from(String(val), Number);
                const coof = [2, 4, 10, 3, 5, 9, 4, 6, 8]
                var n = 0;
                for (var i in coof) {
                    n += coof[i] * arrayInn[i];
                }
                const result = n % 11 % 10;
                return arrayInn[9] === result
            }, { message: 'Ошибка в ИНН' }),
        tonality: z.enum(['any', 'negative', 'positive'], { message: 'Выберите тональность' }),
        limit: z.coerce.number({ message: 'Число' }).min(1, { message: 'Должно быть больше 0' }).max(1000, { message: 'Должно быть меньше 1000' }),
        startDate: z.coerce.date({ message: 'Укажите начальную дату' }),
        endDate: z.coerce.date({ message: 'Укажите конечную дату' }),
        maxFullness: z.boolean().optional(), // признак максимальной полноты
        inBusinessNews: z.boolean().optional(), // Упоминания в бизнес-контексте
        onlyMainRole: z.boolean().optional(),  // главная роль в публикации
        onlyWithRiskFactors: z.boolean().optional(), //Публикации только с риск-факторами
        news: z.boolean().optional(),// Включать сводки новостей
        anonce: z.boolean().optional(),// Включать анонсы и календари
        technicnews: z.boolean().optional(),// Включать технические новости рынков
    }
).refine((val) => val.endDate > val.startDate, { message: 'Конечная дата не может быть меньше начальной', path: ['startDate'] }
).refine((val) => val.endDate > val.startDate, { message: 'Конечная дата не может быть меньше начальной', path: ['endDate'] }
)

type IRequestForm = z.infer<typeof schemaForm>;


export const RequestForm: FunctionComponent = () => {

    const navigator = useNavigate()
    const tokenAccess = useAppSelector(state => state.authSt.accessToken)
    const dispatch = useAppDispatch()

    const { register, handleSubmit, getValues, formState: { errors, isDirty, isValid } } = useForm<IRequestForm>({
        resolver: zodResolver(schemaForm),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            tonality: 'any',
            maxFullness: true,
            inBusinessNews: true,
            onlyMainRole: true
        },
    });

    const onSub: SubmitHandler<IRequestForm> = async (data) => {
        const targetSearchEntitie: ITargetSearchEntity = {
            type: 'company',
            inBusinessNews: data.inBusinessNews || null,
            sparkId: null,
            entityId: null,
            inn: data.inn,
            maxFullness: data.maxFullness!
        }
        const targetSearchEntitiesContext: ITargetSearchEntitiesContext = {
            targetSearchEntities: [targetSearchEntitie],
            onlyMainRole: data.onlyMainRole!,
            onlyWithRiskFactors: data.onlyWithRiskFactors!,
            tonality: data.tonality!,
        }
        const interval = {
            startDate: data.startDate,
            endDate: data.endDate
        }
        let dataRequest: IHistogrammRequesBody = {
            intervalType: 'month',
            histogramTypes: ['totalDocuments', 'riskFactors'],
            issueDateInterval: interval,
            searchContext: { targetSearchEntitiesContext: targetSearchEntitiesContext },
            similarMode: 'none',
            limit: data.limit,
            sortType: 'issueDate',
            sortDirectionType: 'desc',
        }
        dispatch(fetchHistogrum({ accessToken: tokenAccess, data: dataRequest }))
        navigator('/documents')
    }

    return (
        <form onSubmit={handleSubmit(onSub)}>
            <div className={style.wrapper}>

                <div className={style.firstcolomn}>
                    <div> ИНН Компании*</div>
                    <input
                        {...register('inn')}
                        type="text"
                        placeholder='10 цифр'
                        className=
                        {errors.inn?.message ?
                            style.errorinput :
                            ''
                        } />
                    {errors.inn?.message && <span className={style.error}>
                        {errors.inn?.message}
                    </span>}

                    <div>Тональность</div>
                    <select
                        {...register('tonality')} >
                        <option defaultValue="any" value="any">Любая</option>
                        <option value="negative">Негативная</option>
                        <option value="positive">Позитивная</option>
                    </select>

                    <div>Количество документов в выдаче*</div>
                    <input
                        {...register('limit')}
                        type="text"
                        placeholder='от 1 до 1000'
                        className=
                        {errors.limit?.message ?
                            style.errorinput :
                            ''
                        } />
                    {errors.limit?.message && <span className={style.error}>
                        {errors.limit?.message}
                    </span>}

                    <div>Диапазон поиска*</div>
                    <div className={style.date}>
                        <input
                            {...register('startDate')}
                            type='text'
                            onBlur={(e) => {
                                register('startDate').onBlur(e);
                                e.target.type = "text"
                            }}
                            onFocus={(e) => {
                                e.target.type = "date"
                            }}
                            placeholder='Дата начала' />
                        <input
                            {...register('endDate')}
                            type="text"
                            onBlur={(e) => {
                                register('endDate').onBlur(e);
                                e.target.type = "text"
                            }}
                            onFocus={(e) => {
                                e.target.type = "date"
                            }}
                            placeholder='Дата конца' />
                    </div>
                    {(errors.startDate?.message || errors.endDate?.message) ?

                        <span className={style.error}>
                            {errors.startDate?.message || errors.endDate?.message}
                        </span> :
                        <></>}

                </div>

                <div className={style.secondcolomn}>
                    <div>

                        <input id='cb1' type='checkbox' {...register('maxFullness')} />
                        <label htmlFor='cb1'>Признак максимальной полноты</label>
                    </div>
                    <div>
                        <input id='cb2' type='checkbox' {...register('inBusinessNews')} />
                        <label htmlFor='cb2'>Упоминания в бизнес-контексте</label>
                    </div>
                    <div>
                        <input id='cb3' type='checkbox' {...register('onlyMainRole')} />
                        <label htmlFor='cb3'>Главная роль в публикации</label>
                    </div>
                    <div>
                        <input id='cb4' type='checkbox' {...register('onlyWithRiskFactors')} />
                        <label htmlFor='cb4'>Публикации только с риск-факторами</label>
                    </div>
                    <div>
                        <input id='cb5' type='checkbox' {...register('technicnews')} />
                        <label htmlFor='cb5'>Включать технические новости рынков</label>
                        <span></span>
                    </div>
                    <div>
                        <input id='cb6' type='checkbox' {...register('anonce')} />
                        <label htmlFor='cb6'>Включать анонсы и календари</label>
                    </div>
                    <div>
                        <input id='cb7' type='checkbox' {...register('news')} />
                        <label htmlFor='cb7'>Включать сводки новостей</label>
                    </div>

                    <button type='submit' disabled={!isDirty || !isValid}>Поиск</button>
                </div>
            </div>
        </form >
    )
}