import {useForm} from 'react-hook-form'

const Register = () => {
    const {register, handleSubmit, watch, formState: { errors } } = useForm();


    const password = watch('password')

    return(
        <div>Register Page</div>


    )
}


export default Register; 

