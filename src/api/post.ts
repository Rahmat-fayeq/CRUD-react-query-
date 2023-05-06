import axios from 'axios';

interface IPost{
    id: string;
    titles: string;
    description: string;
}

export async function fetchPosts(){
    const response = await axios('http://localhost:3000/posts');
    return response.data;
}

export async function fetchPost(id:string){
    const response = await axios(`http://localhost:3000/posts/${id}`);
    return response.data;
}

export async function DeletePost(id:string){
    const response = await axios.delete(`http://localhost:3000/posts/${id}`);
    return response.data;
}

export async function addPost(storePost:IPost){
    const response = await axios.post(`http://localhost:3000/posts`,storePost);

    return response.data;
}

export async function editPost(updatedPost:IPost){
    const response = await axios.put(`http://localhost:3000/posts/${updatedPost.id}`,updatedPost);

    return response.data;
}