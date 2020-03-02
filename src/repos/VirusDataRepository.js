import axios from 'axios';

export default class VirusDataRepository {
  static all() {
    return new Promise((resolve, reject) => {
      axios.get('http://covid-19-api.richardringia.com/api/virus/all', {
        headers: {
          'authorization': 'dbd0a3-1dd1a3-1c68d6-696db9-1df3fc',
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
