import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
                    const response = await fetch(`https://api.realworld.io/api/articles?author?username=imnotsosure1`);
                    const data = await response.json();
                    console.log('Fetched articles:', data.articles);
                    setArticles(data.articles);
                } catch (err) {
                    console.error('Failed to fetch articles:', err);
                }
                setLoading(false);
            }
        };
        fetchArticles();
    }, [user]);
    

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
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
                <label>Username</label>
                <input type='text'
                    {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <p className='error'>{errors.username.message}</p>}

                <label>Email</label>
                <input 
                    type='email'
                    {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' } })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <label>Avatar URL</label>
                <input 
                    type='text'
                    {...register('avatar', { required: 'Avatar URL is required' })}
                />
                {errors.avatar && <p className="error">{errors.avatar.message}</p>}

                <button type='submit' className='btn btn-primary'>Save</button>
            </form>

            <h3>Your Articles</h3>
            {loading ? (
                <p>Loading articles...</p>
            ) : (
                articles.length > 0 ? (
                    <ul>
                        {articles.map((article) => (
                            <li key={article.slug}>
                                <a href={`/article/${article.slug}`}>{article.title}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No articles found.</p>
                )
            )}
        </div>
    );
}

export default Profile;
