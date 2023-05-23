import Post from '../components/Posts/Post';
import { useEffect, useState } from 'react';

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect (() => {
        fetch('http://localhost:4000/posts').then(res => res.json().then(data => setPosts(data)));
    }, []);
    return (
        <>
            {
                posts && posts.map(post => <Post {...post} key={post._id} />)
            }
        </>
    )
}