import axios from 'axios';
let FormData = require('form-data');

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = process.env.REACT_APP_API_URL_SERVER;
axios.defaults.withCredentials = false;

const HEADERS = { 
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*' 
}

export const getCategories = async () => {
   let response = await axios.get(
      `${API_URL}/getCategories/`, 
      { HEADERS }
   );
   return response.data
}

export const getClips = async (categoryId, pageNum) => {
   let response = await axios.get(
      `${API_URL}/getClips/${categoryId}/${pageNum}/`, 
      { HEADERS }
   );
   return response.data;
}

export const getClipDetail = async (clipId) => {
   let response = await axios.get(
      `${API_URL}/getClipDetail/${clipId}/`, 
      { HEADERS }
   );
   return response.data;
}

export const reportClip = async (clipId, reason) => {
   let data = {
      clipId,
      reason
   }
   let response = await axios.post(
      `${API_URL}/reportClipWeb/`, 
      data,
      { HEADERS }
   );
   return response.data;
}

export const ytToS3 = async (youtubeLink) => {
   // let encode = encodeURIComponent(youtubeLink);
   let data={
      videoURL: youtubeLink
   }
   let response = await axios.post(
      `${API_URL}/downloadVideoWeb/`,
      data,
      { HEADERS }
   )
   return response.data;
}

export const uploadHowlWeb = async (
   startTime,
   endTime,
   file,
   newThumb,
   name,
   tags,
   title,
   speaker
) => {
   let formData = new FormData();
   formData.append('startTime', startTime);
   formData.append('endTime', endTime);
   formData.append('videoFile', file);
   formData.append('imageFile', newThumb);
   formData.append('source', name);
   formData.append('tags', tags);
   formData.append('content', title);
   formData.append('duration', (endTime - startTime));
   formData.append('speaker', speaker);
   formData.append('photo', '0');
   formData.append('category_id', '1');

   const config = {
      headers: {
         // 'Content-Type': 'multipart/form-data',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Headers': '*', 
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      }
   }

   let response = await axios.post(`${API_URL}/uploadClipWeb/`, formData, config);
   return response.data;
}

export const uploadHowlYoutube = async (
   startTime,
   endTime,
   youtubeId,
   newThumb,
   name,
   tags,
   title,
   speaker
) => {
   let formData = new FormData();
   formData.append('startTime', startTime);
   formData.append('endTime', endTime);
   formData.append('videoId', youtubeId);
   formData.append('imageFile', newThumb);
   formData.append('source', name);
   formData.append('tags', tags);
   formData.append('content', title);
   formData.append('duration', (endTime - startTime));
   formData.append('speaker', speaker);
   formData.append('photo', '0');
   formData.append('category_id', '1');

   const config = {
      headers: {
         // 'Content-Type': 'multipart/form-data',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*' ,
         'Access-Control-Allow-Headers': '*',
         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      }
   }

   let response = await axios.post(`${API_URL}/uploadClipYoutube/`, formData, config);
   return response.data;
}