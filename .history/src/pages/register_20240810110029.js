import {useForm} from 'react-hook-form'

const Register = () => {
    const {register, handleSubmit, watch, formState: { errors } } = useForm();


    const password = watch('password')
    const onSubmit = data => { //data keeps track of key value pairs from useForm
        const userData = {...data, avatar: 'https://example.com/avatar.png' }
    }

    return(
        <div>Register Page</div>


    )
}


export default Register; 

