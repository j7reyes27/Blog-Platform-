import {useForm} from 'react-hook-form'
import icon from '../assets/icon.png'

const Login =() => {
    const {register, handleSubmit, formState: {errors}} =useForm();

    const onSubmit = data => {
        const userData = {...data, username: 'DemoUser', avatar: icon};
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href='/';
    }

    return(
        <div className='login-container'>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                <label>Email Address</label>
                <input type='email' placeholder='Email address' {...register('email', {required: 'Email is required'})} />
                {errors.email && <p className='error'>{errors.email.message}</p>}

                <label>Password </label>
                <input type='password' placeholder='Password' {...register('password', {required: 'Password is required'})}/>
                {errors.password && <p className='error'>{errors.password.message}</p>}
            </form>
        </div>
    )
}

export default Login; 