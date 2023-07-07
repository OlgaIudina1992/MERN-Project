import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import {formatISO9075} from "date-fns"
import { UserContext } from "../context/UserContext";

export default function SinglePostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext)
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, []);

    if(!postInfo) {
        return '';
    }

    return (
        <div>
        <Header />
        <div>        
            <div className="w-full h-56 overflow-hidden rounded-2xl border-4 flex justify-end items-center">
                <img src={`http://localhost:5000/api/${postInfo.cover}`} alt="post image" />
            </div>
            <div className="text-lg font-serif p-2">
            <h1 className="text-center text-4xl capitalize font-bold p-2 my-2">{postInfo.title}</h1>
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-2xl font-bold">By {postInfo.author.username}</h2>                            
                <time className="text-sm font-light">{formatISO9075(new Date(postInfo.createdAt))}</time>
                <div className="flex items-center justify-between gap-2">
                <span className="pill">{postInfo.badge}</span>
                {userInfo.id === postInfo.author._id && 
                    (<Link to={`/edit/${postInfo._id}`}>
                        <button className="primary bg-green-600">Edit</button> 
                    </Link>)}
                    </div>        
            </div>
        </div>        
        <div className="px-12 py-2 font-sans text-md" dangerouslySetInnerHTML={{__html:postInfo.content}} >
        </div>
        </div>
    </div>
    )
}