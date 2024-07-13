import axios from 'axios';

export const getPosts = async () => {
    try {
        const response = await axios.get('http://localhost:1375/posts');
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const getPost = async (idPost) => {
    try {
        const response = await axios.get(`http://localhost:1375/posts/${idPost}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const getComms = async () => {
    try {
        const response = await axios.get('http://localhost:1375/comments');
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const getComm = async (idComm) => {
    try {
        const response = await axios.get(`http://localhost:1375/comments/${idComm}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const addComm = async (addComm) => {
    try {
        const response = await axios.post('http://localhost:1375/comments/',addComm);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const delComm = async (delComm) => {
    try {
        const response = await axios.delete(`http://localhost:1375/comments/${delComm}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const editComm = async (idComm, editComm) => {
    try {
        const response = await axios.put(`http://localhost:1375/comments/${idComm}`,editComm);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const addPost = async (newPost) => {
    try {
        const response = await axios.post('http://localhost:1375/posts', newPost);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const delPost = async (delPost) => {
    try {
        const response = await axios.delete(`http://localhost:1375/posts/${delPost}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const editPost = async (idPost, editPost) => {
    try {
        const response = await axios.put(`http://localhost:1375/posts/${idPost}`,editPost);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}