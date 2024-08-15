import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Post from '../components/Post'; // Adjust the import based on your project structure

const Profile = () => {
    const { username } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]); // State to store user's articles
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username === username) {
            setUser(storedUser);
            setValue('username', storedUser.username);
            setValue('email', storedUser.email);
            setValue('avatar', storedUser.avatar);
        }
    }, [username, setValue]);

    useEffect(() => {
        const fetchArticles = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');  // Ensure correct token retrieval
                    const response = await fetch(`https://api.realworld.io/api/articles?author=${username}`, {
                        headers: {
                            'Authorization': `Token ${token}`,  // Set Authorization header
                            'Origin': 'https://api.realworld.io'  // Set Origin header
                        }
                    });

                    const data = await response.json();
                    console.log('Fetched articles:', data.articles);
                    setArticles(Array.isArray(data.articles) ? data.articles : []); // Ensure articles is always an array
                } catch (err) {
                    console.error('Failed to fetch articles:', err);
                    setArticles([]); // Fallback to an empty array in case of an error
                }
                setLoading(false);
            }
        };
        fetchArticles();
    }, [user, username]);

    const onSubmit = (data) => {
        const updatedUser = { ...user, ...data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert('Profile updated successfully');
        window.location.href = '/';
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className='profile-container'>
            <div className="profile-form-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
                    <label>Username</label>
                    <input 
                        type='text'
                        {...register('username', { required: 'Username is required' })}
                        placeholder="Username"
                    />
                    {errors.username && <p className='error'>{errors.username.message}</p>}

                    <label>Email address</label>
                    <input 
                        type='email'
                        {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' } })}
                        placeholder="Email address"
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <label>New password</label>
                    <input 
                        type='password'
                        {...register('password')}
                        placeholder="New password"
                    />

                    <label>Avatar image (url)</label>
                    <input 
                        type='text'
                        {...register('avatar', { required: 'Avatar URL is required' })}
                        placeholder="Avatar image"
                    />
                    {errors.avatar && <p className="error">{errors.avatar.message}</p>}

                    <button type='submit' className='btn btn-primary'>Save</button>
                </form>
            </div>

            <h3>Your Articles</h3>
            {loading ? (
                <p>Loading articles...</p>
            ) : (
                articles.length > 0 ? (
                    <div className="posts-container">
                        {articles.map((article) => (
                            <Post key={article.slug} article={article} />
                        ))}
                    </div>
                ) : (
                    <p>No articles found.</p>
                )
            )}
        </div>
    );
}

export default Profile;
