import axios from 'axios';
import SyncStorage from 'sync-storage';


export default class VirusDataRepository {
  static async all() {
    await SyncStorage.init();
    // console.log('AsyncStorage is ready!', data);
    return new Promise((resolve, reject) => {

      let dateParam = '';
      let updatedDate = SyncStorage.get('covid-19-data-updated-date');
      if (updatedDate != null || updatedDate !== undefined) {
        dateParam = '?updated-date=' + encodeURIComponent(updatedDate);
      }

       axios.get('https://covid-19-api.richardringia.com/api/virus/all'  + dateParam, {
      // axios.get('http://127.0.0.1:8000/api/virus/all' + dateParam, {
        headers: {
          'authorization': '9d39a8-8dec29-d455ee-23a1a2-863bc1',
          // 'authorization': '3f46fe-d0b0a9-8a2d83-85095d-5d8623',
        },
      })
        .then(response => {

          let data = response.data;


          if (data.covid !== undefined && data.updated !== undefined && data.updated === true) {
            SyncStorage.set('covid-19-data', JSON.stringify(data.covid));
            SyncStorage.set('covid-19-data-updated-date', new Date().toString());

            console.log('Saving new data...');

            resolve(data.covid);
          } else {
            let dataJson = SyncStorage.get('covid-19-data');
            if (dataJson !== undefined) {
              console.log('Getting existing data...');
              let data = JSON.parse(dataJson);

              if (data !== null || data !== '') {
                resolve(data);
              }
            }
          }

          reject('no data found');

        })
        .catch(reason => {
          console.log(reason);
          console.log(reason.response);
          //TODO: CREATE ERROR MESSAGE
          reject(reason);
        });
    });
  }
}
