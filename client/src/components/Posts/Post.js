import { format } from 'date-fns'

export default function Post({title, summary, cover, author, createdAt}) {
    return (
        <div className='post'>
        <div className='image'>
          <img src={`http://localhost:4000/${cover}`} alt={title} />
        </div>
        <div className='texts'>
          <h2>{title}</h2>
          <p className='info'>
            <a href='/' className='author'>{author.username}</a> 
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
    )
}