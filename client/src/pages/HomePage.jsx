import { useEffect, useState } from "react";
import Header from "../components/Header";
import NewPost from "../components/NewPost";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/post").then(response => {
            response.json().then(posts => {
                setPosts(posts)
            });
        });
    },[]);
    return (
        <div>
            <Header />
            {posts.length > 0 && posts.map((post, i) => (
                <NewPost {...post} key={i} />
            ))}
        </div>
    )
}