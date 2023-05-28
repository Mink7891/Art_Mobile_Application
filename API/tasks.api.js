import axios from "axios";




const API_URL = 'http://46.243.227.254:8080/tasks/quiz';
const ANSWER_QUIZ_URL = 'http://46.243.227.254:8080/tasks/quiz'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg0NzU2NTg2LCJleHAiOjE2ODczNDg1ODZ9.mhQShaaLaWBtsUcl6Lb6IeygktNS5D4KYLX-MkR5P6k'
const VIDEOS_TASK_URL = "http://46.243.227.254:8080/tasks/videos"



export const fetchData = () => {
  return fetch(API_URL, {method: 'GET',headers: {Authorization: `Bearer ${token}`, }})
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};


export const answerByUser = (quiz_id,user_answer) => {
 
  return axios.post(ANSWER_QUIZ_URL, {"quiz_id" : quiz_id,"user_answer" : user_answer}, {headers: {"Authorization" : `Bearer ${token}`}})

}


export const fetchVideosContent = () => {
  return fetch(VIDEOS_TASK_URL , {method: 'GET',headers: {Authorization: `Bearer ${token}`, }})
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}