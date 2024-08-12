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
        <div>
            Hello login
        </div>
    )
}

export default Login; 