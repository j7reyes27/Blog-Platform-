import {useForm} from 'react-hook-form'

const Login =() => {
    const {register, handleSubmit, formState: {errors}} =useForm();


    return(
        <div>
            Hello login
        </div>
    )
}

export default Login; 