import axios from 'axios';

export const getPosts = async () => {
    try {
        const response = await axios.get('https://66928451346eeafcf46d2b6c.mockapi.io/regit/posts');
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const getPost = async (idPost) => {
    try {
        const response = await axios.get(`https://66928451346eeafcf46d2b6c.mockapi.io/regit/posts/${idPost}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const getComms = async () => {
    try {
        const response = await axios.get('https://66928451346eeafcf46d2b6c.mockapi.io/regit/comments');
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const getComm = async (idComm) => {
    try {
        const response = await axios.get(`https://66928451346eeafcf46d2b6c.mockapi.io/regit/comments/${idComm}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const addComm = async (addComm) => {
    try {
        const response = await axios.post('https://66928451346eeafcf46d2b6c.mockapi.io/regit/comments/',addComm);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const delComm = async (delComm) => {
    try {
        const response = await axios.delete(`https://66928451346eeafcf46d2b6c.mockapi.io/regit/comments/${delComm}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const editComm = async (idComm, editComm) => {
    try {
        const response = await axios.put(`https://66928451346eeafcf46d2b6c.mockapi.io/regit/comments/${idComm}`,editComm);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched comms: ${err}`);
    }
}

export const addPost = async (newPost) => {
    try {
        const response = await axios.post('https://66928451346eeafcf46d2b6c.mockapi.io/regit/posts', newPost);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const delPost = async (delPost) => {
    try {
        const response = await axios.delete(`https://66928451346eeafcf46d2b6c.mockapi.io/regit/posts/${delPost}`);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}

export const editPost = async (idPost, editPost) => {
    try {
        const response = await axios.put(`https://66928451346eeafcf46d2b6c.mockapi.io/regit/posts/${idPost}`,editPost);
        return response.data;
    }
    catch (err) {
        throw new Error(`Error fetched posts: ${err}`);
    }
}