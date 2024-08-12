import {useForm} from 'react-hook-form'

const Register = () => {
    const {register, handleSubmit, watch, formState: { errors } } = useForm();


    const password = watch('password')
    const onSubmit = data => { //data keeps track of key value pairs from useForm
        const userData = {...data, avatar: 'https://example.com/avatar.png' };
        localStorage.setItem('user', JSON.stringify(userData))//because local storage can only save strings 
    }

    return(
        <div className='register-container'>
            <h2>Create new account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
                <label>Username</label>
                <input type="text" placeholder="Username" {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Minimum length is 3' } })} />
                {errors.utername && <p className='error'> {errors.username.message}</p>}

                <label>Email address</label>
        <input type="email" placeholder="Email address" {...register('email', { required: 'Email is required' })} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Password</label>
        <input type="password" placeholder="Password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' } })} />
        {errors.password && <p className="error">{errors.password.message}</p>}
                </form>
        </div> 

    )
}


export default Register; 

