import postTemplate from '../temp/postTemplate.hbs';
import commentsTemplate from '../temp/commentsTemplate.hbs'
import { getPosts, getComms, addPost, delPost, editPost, getPost, addComm, editComm, delComm, getComm } from './API';
import * as basicLightbox from 'basiclightbox';

let modal;
let page = 0;

const renderPosts = () => getPosts().then(posts => {
    console.log(posts)
    posts = posts.filter(post => post.title.toLowerCase().includes(document.querySelector('.findPost').value.toLowerCase()));
    posts = posts.slice(page*4,page*4+4)
    document.querySelector('.posts').style.height = `${document.querySelector('.posts').offsetHeight}px`;
    document.querySelector('.posts').innerHTML = postTemplate({ posts });
    document.querySelector('.posts').style.height = `${document.querySelector('.posts').scrollHeight}px`;
    posts.forEach(post => {
        getComms().then(comments => {
            comments = comments.filter(comment => comment.postid === post.id);
            console.log(comments)
            comments.length !== 0 ? document.querySelector(`.posts__post[data-id="${post.id}"]`).innerHTML += `<ul class="posts__comments" data-id="${post.id}"><h2 class="posts__comtitle">Comments:</h2>${commentsTemplate({ comments })}</ul>` : null;
            document.querySelector('.posts').style.height = `${document.querySelector('.posts').scrollHeight}px`;
            // document.querySelector(`.showComments[data-id="${post.id}"]`).addEventListener('click', (e) => document.querySelector(`.posts__comments[data-id="${post.id}"]`).classList.toggle('show'));
        });
    });
});

renderPosts();

document.querySelector('.minusPage').addEventListener('click', (e) => page > 0 ? (page -= 1,renderPosts()) : null);
document.querySelector('.addPage').addEventListener('click', (e) => getPosts().then(posts => (posts = posts.filter(post => post.title.toLowerCase().includes(document.querySelector('.findPost').value.toLowerCase())), page < Math.floor(posts.length/6) ? (page += 1, renderPosts()) : null)));

document.querySelector('.createPost__button').addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelector('.createPost').checkValidity()) {
        getPosts().then(posts => {
            let id = posts.length;
            while (posts.find(post => Number(post.id) === id)) id += 1;
            console.log(id)
            addPost({
                title: document.querySelector('.createPost__title').value,
                author: document.querySelector('.createPost__author').value,
                text: document.querySelector('.createPost__text').value,
                date: new Date().toDateString(),
                likes: 0,
                id: String(id)
            }).then(data => (renderPosts(),document.querySelector('.createPost__title').value = '',document.querySelector('.createPost__author').value = '',document.querySelector('.createPost__text').value = ''));
        });
    }
    else {
        document.querySelector('.createPost').reportValidity();
    }
});

document.querySelector('.posts').addEventListener('click', (e) => {
    e.preventDefault();
    e.target.closest('.posts__delete') !== null ? (getComms().then(comms => comms.forEach(comm => comm.postid == e.target.closest('.posts__delete').dataset.id ? delComm(comm.id) : null)),delPost(e.target.closest('.posts__delete').dataset.id).then(data => renderPosts())) : null;
    e.target.closest('.posts__edit') !== null ? (modal = basicLightbox.create(`
        <form class="editPosts">
            <input type="text" class="editPosts__title" placeholder="Title:">
            <textarea class="editPosts__text"></textarea>
            <input type="text" class="editPosts__author" placeholder="Author:">
            <button type="submit" class="editPosts__button" data-id="${e.target.closest('.posts__edit').dataset.id}">Edit post</button>
        </form>
    `),modal.show(),document.querySelector('.editPosts__button').addEventListener('click', (e) => (e.preventDefault(),getPost(e.target.dataset.id).then(post => editPost(e.target.dataset.id, {
        title: document.querySelector('.editPosts__title').value !== '' ? document.querySelector('.editPosts__title').value : post.title,
        author: document.querySelector('.editPosts__author').value !== '' ? document.querySelector('.editPosts__author').value : post.author,
        text: document.querySelector('.editPosts__text').value !== '' ? document.querySelector('.editPosts__text').value : post.text,
        date: post.date,
        likes: post.likes
    }).then(data => renderPosts()), modal.close())))) : null;
    e.target.closest('.posts__minus') !== null ? getPost(e.target.dataset.id).then(post => editPost(e.target.dataset.id, {
        title: post.title,
        author: post.author,
        text: post.text,
        date: post.date,
        likes: post.likes-=1
    }).then(data => renderPosts())) : null;
    e.target.closest('.posts__plus') !== null ? getPost(e.target.dataset.id).then(post => editPost(e.target.dataset.id, {
        title: post.title,
        author: post.author,
        text: post.text,
        date: post.date,
        likes: post.likes+=1
    }).then(data => renderPosts())) : null;
    e.target.closest('.posts__combut') !== null ? getComms().then(comms => {
        let id = comms.length;
        while (comms.find(comm => Number(comm.id) === id)) id += 1;
        console.log(id);
        addComm({
            text: document.querySelector(`.posts__comtext[data-id="${e.target.closest('.posts__combut').dataset.id}"]`).value,
            author: document.querySelector(`.posts__comauthor[data-id="${e.target.closest('.posts__combut').dataset.id}"]`).value,
            date: new Date().toDateString(),
            id: String(id),
            postid: e.target.closest('.posts__combut').dataset.id
        }).then(data => (renderPosts(),document.querySelector(`.posts__comtext[data-id="${e.target.closest('.posts__combut').dataset.id}"]`).value = '',document.querySelector(`.posts__comauthor[data-id="${e.target.closest('.posts__combut').dataset.id}"]`).value = ''));
    }) : null;
    e.target.closest('.posts__comdelete') !== null ? delComm(e.target.closest('.posts__comdelete').dataset.id).then(data => renderPosts()) : null;
    e.target.closest('.posts__comedit') !== null ? (modal = basicLightbox.create(`
        <form class="editComms">
            <input type="text" class="editComms__text" placeholder="Text:">
            <input type="text" class="editComms__author" placeholder="Author:">
            <button type="submit" class="editComms__button" data-id="${e.target.closest('.posts__comedit').dataset.id}">Edit comment</button>
        </form>
    `),modal.show(),document.querySelector('.editComms__button').addEventListener('click', (e) => (e.preventDefault(),getComm(e.target.dataset.id).then(comm => editComm(e.target.dataset.id, {
        author: document.querySelector('.editComms__author').value !== '' ? document.querySelector('.editComms__author').value : comm.author,
        text: document.querySelector('.editComms__text').value !== '' ? document.querySelector('.editComms__text').value : comm.text,
        date: comm.date,
        postid: comm.postid
    }).then(data => renderPosts()), modal.close())))) : null;
});

document.querySelector('.findPost').addEventListener('input', (e) => renderPosts());