
const Post = (article) => {
    return(
        <div className='post'>
            <div className='post-header'>
                <div className="post-title-container">
                    <Link to={`/article/${article.slug}`} className='Post-title-link'>
                    <h2 className="post-title">{article.title}></h2>
                </div>
            </div>
        </div>
    )
}


export default Post; 