import axios from 'axios';
import { ActionTypes } from '../constants/actionType';

// senkron bir aksiyon
export const getDataStart = () => ({
  type: ActionTypes.GET_DATA_START,
  payload: true,
});

// asenkron bir aksiyon
export const getAnswer = (prompt) => async (dispatch) => {
  // asenkron işlemler
  const options = {
    method: 'POST',
    url: 'https://openai80.p.rapidapi.com/chat/completions',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '554b5c9a03msh4a008333f18e61ap1fb405jsnbaa4227abd20',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
    },
    data: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${prompt}"}]}`,
  };

  const res = await axios.request(options);

  dispatch({
    type: ActionTypes.GET_ANSWER,
    payload: { prompt, answer: res.data.choices[0].message.content },
  });
};

// resim versi almak için kullanıla aseknron aksiyon:
export const getImage = (prompt) => async (dispacth) => {
  // axios isteği için gerekli ayarlar
  const options = {
    method: 'POST',
    url: 'https://openai80.p.rapidapi.com/images/generations',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '554b5c9a03msh4a008333f18e61ap1fb405jsnbaa4227abd20',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
    },
    data: `{"prompt":"${prompt}","n":2,"size":"1024x1024"}`,
  };

  // resim için istek atma kısmı
  const res = await axios.request(options);

  // reducera göndereme kısmı
  dispacth({
    type: ActionTypes.GET_IMAGE,
    payload: { prompt, answer: res.data.data },
  });
};

//
//
//
//
//
//
//
//
//
//
//

// senkron > geciikme olmaz

// asenkron > belli bir süre sonra gerçekleşir

//  reduxta reducerların pure(gelicek datanın belli olması) kalması için bizim asenkron aksiyonlar oluşturmam izin vermez
//  redux thunk bu durumda devreye girer
//  thunk middleware genelde asenkron işlemler yapmak için kullanılır
//   middleware: bir işlem gerçekleimeden önce veya sonra aksiyonu çağırır

// -----------YASAK---------------
// bize izin verilmeyen yöntem
// export const getAnswer = async () => {
//   const res = await axios.get('https://jsonplaceholder.typicode.com/todos/');
//   return {
//     type: ActionTypes.GET_ANSWER,
//     payload: res.data,
//   };
// };

// ----------Uzun yol-----------
// asenkron bir aksiyon oluşturabiliyorum
// export const getAnswer1 = () =>
//   async function fetchData(dispatch) {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/todos/');

//     dispatch({
//       type: ActionTypes.GET_ANSWER,
//       payload: res.data,
//     });
//   };

// -----------Kısa Yol-----------------
//  Asenkron Aksiyon Kısa Yolu
// export const kisaYol = () => (dispatch) => {
//   // asenkron işlemler

//   dispatch({ type: 'Akisyon Tipi', payload: 'Veri' });
// };
