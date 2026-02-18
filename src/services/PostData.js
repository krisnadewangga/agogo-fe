import DefaultIP from '../containers/DefaultIP'

export function PostData(type, encodedDataUser) {

    let BaseURL = DefaultIP + `/api/`;
    // let BaseURL = `https://apipipipol.btoz.co.id/api/`;
    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';

    return new Promise((resolve, reject) =>{
    
        const AUTH_TOKEN = localStorage.getItem('id_token');
         
        fetch(BaseURL+type, {
            method: 'POST',
            headers: {
              'x-access-token': AUTH_TOKEN,
              'Access-Control-Allow-Origin': '*',
              'origin': 'x-requested-with',
              'Access-Control-Allow-Headers': 'X-Requested-With',
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Accept':'application/json; charset=utf-8'
            },
            body: encodedDataUser
          })
          .then((response) => response)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            localStorage.removeItem('id_token');
            sessionStorage.removeItem('userData');
            reject(error);
          });

  
      });
}