import { useParams } from "react-router-dom"


const Profile = () => {
    const {username} = useParams();
    const { register, handleSubmit, setValue, formState: {errors}} =useForm();
}