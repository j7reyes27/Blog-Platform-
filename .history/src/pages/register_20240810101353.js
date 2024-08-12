

const Register = () => {
    const {register, handleSubmit, watch, formState: { errors } } = useForm();


    const password = watch('password')

    return(
        <div>Password Page</div>


    )
}


export default Register; 

