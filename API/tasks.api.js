import axios from "axios";




const API_URL = 'http://46.243.227.254:8080/tasks/quiz';
const ANSWER_QUIZ_URL = 'http://46.243.227.254:8080/tasks/quiz'
const VIDEOS_TASK_URL = "http://46.243.227.254:8080/tasks/videos"




export const fetchData = (token) => {
  return fetch(API_URL, {method: 'GET',headers: {Authorization: `Bearer ${token}`, }})
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};


export const answerByUser = (quiz_id,user_answer,token) => {
  
  return axios.post(ANSWER_QUIZ_URL, {"quiz_id" : quiz_id,"user_answer" : user_answer}, {headers: {"Authorization" : `Bearer ${token}`}})

}

export const answerByUserVideo = (task_video_id,user_answer,token) => {
  
  return axios.post(VIDEOS_TASK_URL, {"task_video_id" : task_video_id, "user_answer" : user_answer}, {headers: {"Authorization" : `Bearer ${token}`}})

}


export const fetchVideosContent = (token) => {
  return fetch(VIDEOS_TASK_URL , {method: 'GET',headers: {Authorization: `Bearer ${token}`, }})
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}