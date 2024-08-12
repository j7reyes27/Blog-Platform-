import { useParams } from "react-router-dom"
import {useForm} from 'react-hook-form'


const Profile = () => {
    const {username} = useParams();
    const { register, handleSubmit, setValue, formState: {errors}} = useForm();
    const [user, setUser] = useState(null); 


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser && storedUser.username === username) {
            setUser(storedUser)
            setValue('username', storedUser.username)
            setValue('email', storedUser.email);
            setValue('avatar', storedUser.Avatar)
        }
    }, [username, setValue]) //why setValue? 

    const onSubmit = (data) => {
        const updatedUser = {...user, ...data};
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser)
        alert('profile updated successfully')
    };

    if (!user) return <div>Loading my brotha</div>

    return (
        <div className='profile-container'>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
                <label>Username</label>
                <input type='text'
                {...register('username', {required: 'Username is required'})}
                />
                {errors.username && <p className='error'>{errors.username.message}</p>}

                <label>Email</label>
                <input 
                type='email'
                {...register('email', {required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' } })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}


                <label>Avatar URL</label>
                <input 
                type='text'
                {...register('avatar', {required: 'Avatar URL is required' })}
                />
                {errors.avatar && <p className="error">{errors.avatar.message}</p>}

                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

