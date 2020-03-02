import axios from 'axios';

export default class VirusDataRepository {
  static all() {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:8000/api/virus/all', {
        headers: {
          'authorization': '3f46fe-d0b0a9-8a2d83-85095d-5d8623',
        },
      })
        .then(response => {
          //TODO: SAVE DATA TO LOCAL STORAGE
          //TODO: CHECK IF DATA EXISTS
          resolve(response);
        })
        .catch(reason => {
          console.error(reason);
          //TODO: CREATE ERROR MESSAGE
          reject(reason);
        });
    });
  }
}
