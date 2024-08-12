import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

const Register = () => {
    const {register, handleSubmit, watch, formState: { errors } } = useForm();


    const password = watch('password')
    const onSubmit = data => { //data keeps track of key value pairs from useForm
        const userData = {...data, avatar: 'https://example.com/avatar.png' };
        localStorage.setItem('user', JSON.stringify(userData))//because local storage can only save strings 
    }

    //...register spreads out the register object which has keys like name, onChange, onBlur etc. it assigns the name from the first argument. so name='username' it only returns it, it doesnt store it but react-hook-form management manages everything internally and keeps track of all the fields. 

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

        <label>Repeat Password</label>
        <input type="password" placeholder="Password" {...register('repeatPassword', { validate: value => value === password || 'Passwords must match' })} />
        {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}

        <div className="checkbox-container">
          <input type="checkbox" {...register('consent', { required: 'Consent is required' })} />
          <label>I agree to the processing of my personal information</label>
        </div>
        {errors.consent && <p className='error'>{errors.consent.message} </p>}
        <button type='submit' className='btn btn-primary'>Create</button>
            </form>
            <p className='sign-in-link'>Already have an account? <Link to="/sign-in"> Sign in</Link></p>
        </div> 

    )
}


export default Register; 

