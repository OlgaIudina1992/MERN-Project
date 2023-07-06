import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [badge, setBadge] = useState('');
    const [content, setContent] = useState('');

    return (<>
        <div>
            <Link to={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </Link>
        </div>    
        <div className="flex flex-col items-center justify-between mt-12">
        
        <h1 className="text-4xl capitalize font-bold p-2">Share your thoughts</h1>
            <form className="border-2 border-green-700 p-8 rounded-2xl">
                <input 
                    type="title" 
                    value={title} 
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Your Title" />
                <input 
                    type="summary"
                    value={summary} 
                    onChange={event => setSummary(event.target.value)} 
                    placeholder="Summary" />
                <input 
                    type="text" 
                    value={badge} 
                    onChange={event => setBadge(event.target.value)}
                    placeholder="Give Your Post a Badge!" />
                <input className="p-2" type="file" />
                <ReactQuill 
                    value={content} 
                    onChange={newValue => setContent(newValue)}
                    modules={modules} 
                    formats={formats} />
                <button className="bg-green-700 primary w-full">Post</button>
            </form>
        </div>
        </>
    )
}