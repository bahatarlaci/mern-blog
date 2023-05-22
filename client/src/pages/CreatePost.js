import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from 'react';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{header: '1'}, {header: '2'}, {font: []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{list: 'ordered'}, {list: 'bullet'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
}
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video',
    'code-block'
]

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type='title' placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type='summary' placeholder={'Summary'} value={summary} onChange={(e) => setSummary(e.target.value)} />
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
            <ReactQuill value={content} modules={modules} formats={formats} onChange={(e) => setContent(e)} />
            <button style={{marginTop:'10px'}} type='submit'>Create Post</button>
        </form>
    )
}