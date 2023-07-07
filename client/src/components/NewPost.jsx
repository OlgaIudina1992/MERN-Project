import {formatISO9075} from "date-fns"
import { Link } from "react-router-dom";

export default function NewPost({_id, title, summary, author, badge, cover, content, createdAt}) {
    return(
    <div className="ml-56 my-2 w-2/3 border-4 border-green-800 rounded-2xl">
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1 w-full h-56 overflow-hidden rounded-2xl border-4 flex justify-end items-center">
        <img className="object-cover" src={"https://localhost:5000/api/"+cover} alt="post image" />
        </div>
        <div className="col-span-2">        
          <h2 className="text-2xl capitalize font-bold p-2 my-2">{title}</h2>       
          <div className="text-lg font-serif p-2 gap-4">  
          {author.username ? (<h3>By {author.username}</h3>) : (<h3>By Anonymous</h3>)}
          <time className="text-md p-2">{formatISO9075(new Date(createdAt))}</time>
          <span className="pill">{badge}</span>
          </div>
          <p className="text-md font-light p-2 mb-2">{summary}</p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-2">
      <Link to={`/post/${_id}`}>
      <button className="primary bg-green-900">Click to read</button>
      </Link>
      </div>      
        </div>      
     
    )
}