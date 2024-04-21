import axios from "axios";

const BASE_URL = 'http://localhost:4000';
const COMMENTS_API = `${BASE_URL}/comments`;

const api = axios

export const findComments = (sid) => {
    console.log("Stock-ID -=>", sid)
    return api.get(`${COMMENTS_API}/${sid}`)
        .then(response => response.data);
}

export const addComment = async (newCommentBody) => {
    const response = await api.post(`${COMMENTS_API}/${newCommentBody.postedBy}/stocks/${newCommentBody.stockID}`,
        {comment : newCommentBody.comment})
    return response.data;
}

export const deleteComment = async (uid, cid) => {
    await api.delete(`${COMMENTS_API}/${uid}/comment/${cid}`);
    return cid
}

export const updateComment = async (uid, cid, comment) => {
    await api.put(`${COMMENTS_API}/${uid}/comment/${cid}`, comment);
    return comment
}

export const countHowManyComments= async (sid) => {
    const response = await api.get(`${COMMENTS_API}/${sid}/commentsCount`)
    return response.data;
}
