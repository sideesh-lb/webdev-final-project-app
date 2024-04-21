import axios from "axios";
const API_BASE = "http://localhost:4000";

export const addBookMark = async (userEmail, news) => {
    let body={userEmail,bannerImage:news.bannerImage,title:news.title,source:news.source,
    summary:news.summary,url:news.url};
    console.log(body);
    let response = await axios.post(`${API_BASE}/addBookMark`, body);
    return response.data;
};

export const deleteBookMark = async (userEmail, url) => {
    let body = { userEmail,url};
    let response = await axios.post(`${API_BASE}/deleteBookMark`,body);
    console.log("Deleting bookmark: ",url,"of", userEmail);
    return response.data;
};

export const getBookMarks = async (userEmail) => {
    let body={userEmail};
    console.log(body);
    let response = await axios.post(`${API_BASE}/getBookMarks`, body);
    return response.data;
};



