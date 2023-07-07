import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Quill from "../components/Quill";

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [badge, setBadge] = useState('');
    const [content, setContent] = useState('');
    const[files, setFiles] = useState('');
    const[redirect, setRedirect] = useState(false);

    const handleSubmit = async (ev) => {
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("badge", badge);
        data.set("content", content);
        data.set("file", files[0]);

        ev.preventDefault();        
        const response = await fetch("http://localhost:5000/post", {
            method: "POST",
            body: data,
            credentials: 'include',             
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (<>
        <div>
            <Link to={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </Link>
        </div>    
        <div className="flex flex-col items-center justify-center mt-12 ml-44 w-4/5 ">
        
        <h1 className="text-4xl capitalize font-bold p-2">Share your thoughts</h1>
            <form onSubmit={handleSubmit} className="border-2 border-green-700 p-8 rounded-2xl">
                <input 
                    type="title" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}
                    placeholder="Your Title" />
                <input 
                    type="summary"
                    value={summary} 
                    onChange={ev => setSummary(ev.target.value)} 
                    placeholder="Summary" />
                <input 
                    type="text" 
                    value={badge} 
                    onChange={ev => setBadge(ev.target.value)}
                    placeholder="Give Your Post a Badge!" />
                <input className="p-2" 
                    type="file"
                    onChange={ev => setFiles(ev.target.files)} />
                
                <Quill value={content} onChange={setContent} />
                
                <button className="bg-green-700 primary w-full">Post</button>
            </form>
        </div>
        </>
    )
}