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
            </form>
        </div> 

    )
}


export default Register; 

