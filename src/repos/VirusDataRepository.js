import axios from 'axios';
import SyncStorage from 'sync-storage';


export default class VirusDataRepository {

  static url = 'https://covid-19-api.richardringia.com/api/virus';
  // static url = 'http://127.0.0.1:8000/api/virus';
  static header = {
    'authorization': '9d39a8-8dec29-d455ee-23a1a2-863bc1',
    // 'authorization': '3f46fe-d0b0a9-8a2d83-85095d-5d8623',
  };
  static existingDataEnabled = true;

  static getDateParam(prefix) {
    let dateParam = '';
    let updatedDate = SyncStorage.get('covid-19-' + prefix + '-data-updated-date');
    if ((updatedDate != null || updatedDate !== undefined) && VirusDataRepository.existingDataEnabled) {
      dateParam = '?updated-date=' + encodeURIComponent(updatedDate);
    }
    return dateParam;
  }

  static getStorageName(prefix) {
    return 'covid-19-' + prefix + '-data';
  }

  static getUpdatedDateName(prefix) {
    return 'covid-19-' + prefix + '-data-updated-date';
  }

  static async all() {
    await SyncStorage.init();
    let prefix = 'all';
    return new Promise((resolve, reject) => {
      let dateParam = this.getDateParam(prefix);

      axios.get(VirusDataRepository.url + '/all' + dateParam, {
        headers: VirusDataRepository.header,
      })
        .then(response => {

          let data = response.data;

          if (data.covid !== undefined && data.updated !== undefined && data.updated === true) {
            SyncStorage.set(VirusDataRepository.getStorageName(prefix), JSON.stringify(data.covid));
            SyncStorage.set(VirusDataRepository.getUpdatedDateName(prefix), new Date().toString());

            console.log('Saving new data...');

            resolve(data.covid);
          } else {
            let dataJson = SyncStorage.get(VirusDataRepository.getStorageName(prefix));
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

  static async allByCountry() {
    await SyncStorage.init();
    let prefix = 'all-by-country';

    return new Promise((resolve, reject) => {
      let dateParam = this.getDateParam(prefix);

      axios.get(VirusDataRepository.url + '/allbycountry' + dateParam, {
        headers: VirusDataRepository.header,
      })
        .then(response => {
          let data = response.data;

          if (data.countries !== undefined && data.updated !== undefined && data.updated === true) {
            SyncStorage.set(VirusDataRepository.getStorageName(prefix), JSON.stringify(data.countries));
            SyncStorage.set(VirusDataRepository.getUpdatedDateName(prefix), new Date().toString());

            console.log('Saving new data...');

            resolve(data.countries);
          } else {
            let dataJson = SyncStorage.get(VirusDataRepository.getStorageName(prefix));
            if (dataJson !== undefined) {
              console.log('Getting existing data...');
              let data = JSON.parse(dataJson);

              if (data !== null || data !== '') {
                resolve(data);
              }
            }


            reject('no data found');
          }
        }).catch(reason => {
        console.log(reason);
        console.log(reason.response);
        //TODO: CREATE ERROR MESSAGE
        reject(reason);
      });
    });
  }
}
