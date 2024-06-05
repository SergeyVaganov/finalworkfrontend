import { FunctionComponent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch } from '../../hooks/hooksStore';
import { fetchAuthorize } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom';
import style from './SignInForm.module.css'


const SignInSchema = z.object({
    login: z.string().min(2, 'имя не может быть меньше 6 символов').refine((val) => {
        if (val.startsWith('+7')) {
            return /^\+7\s?[\d]{3}\s?[\d]{3}\s?[\d]{2}\s?[\d]{2}$/g.test(val);
        }
        return true
    }, { message: 'введите корректные данные' }),
    password: z.string().min(6, 'имя не может быть меньше 6 символов'),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInForm: FunctionComponent = () => {
    const dispath = useAppDispatch()
    const navigator = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema),
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const onSubmit: SubmitHandler<SignInSchemaType> = (data) => {
        dispath(fetchAuthorize(data))
        navigator('/', { replace: true })
    };

    return (
        <div className={style.wrapper}>
            <div>
                <div className={style.lock}>Войти
                    <object type="image/svg+xml" data="img/gallery/lock.svg">
                    </object>
                </div>
                <div>Зарегистрироваться</div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div>Логин или номер телефона:</div>
                <div>
                    <input
                        {...register("login")}
                        placeholder="номер начинается с +7"
                        className={errors.login ?
                            style.errorinput : ''
                        } />
                    {errors.login && <span className={style.error}>{errors.login.message}</span>}
                </div>
                <div>Пароль:</div>
                <div>
                    <input
                        {...register("password")}
                        placeholder=""
                        className={errors.password ?
                            style.errorinput : ''
                        } />
                    {errors.password && <span className={style.error}>{errors.password.message}</span>}
                </div>
                <button type="submit" disabled={!isDirty || !isValid}>Войти</button>
                <div>Восстановить пароль</div>
            </form>
            <div>
                <div>Войти через:</div>
                <div className={style.entries}>
                    <div><img src="img/gallery/google.svg" alt="" /></div>
                    <div><img src="img/gallery/facebook.svg" alt="" /></div>
                    <div><img src="img/gallery/yandex.svg" alt="" /></div>
                </div>
            </div>
        </div>
    )
}