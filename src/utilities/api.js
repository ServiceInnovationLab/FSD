import geolib from 'geolib';
import axios from 'axios';

const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;

const filters = category =>
  category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '';
const STATICFIELDS =
  'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

function loadFilters() {
  const sql = encodeURI(
    `SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`
  );
  const url = `${API_PATH}datastore_search_sql?sql=${sql}`;

  return axios.get(url)
    .then(response => {
      return response.data.result.records;
    })
    .catch(error => {
      return { error };
    });
}

export { loadFilters };

// ------

// export function loadResults(searchVars) {
//   let addressObj = Object.keys(
//     searchVars.addressLatLng ? searchVars.addressLatLng : {}
//   );
//   if (
//     !searchVars.category &&
//     !searchVars.keyword &&
//     (!searchVars.addressLatLng || !searchVars.addressLatLng.latitude)
//   ) {
//     return dispatch => {
//       dispatch(showResults([], searchVars, 0, true));
//     };
//   } else {
//     return dispatch => {
//       dispatch(loadingResults(true));
//       return axios.get(requestBuilder(searchVars)).then(response => {
//         if (addressObj.length === 2 && searchVars.addressLatLng !== undefined) {
//           //greater than 50000 means 100000 of within 50000
//           dispatch(
//             showResults(
//               findNearMe(
//                 response.data.result.records,
//                 searchVars.addressLatLng,
//                 searchVars.radius > 50000 ? 100000 : searchVars.radius
//               ),
//               searchVars,
//               response.data.result.total
//             )
//           );
//         } else {
//           dispatch(
//             showResults(
//               response.data.result.records,
//               searchVars,
//               response.data.result.total
//             )
//           );
//         }
//       });
//     };
//   }
// }

// export function changeCategory(searchVars) {
//   return dispatch => {
//     dispatch(changeCategories(searchVars));
//   };
// }

// export function loadService(searchVars, serviceId) {
//   let url = encodeURI(
//     `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${serviceId}&distinct=true`
//   );
//   if (serviceId) {
//     return dispatch => {
//       dispatch(loadingResults(true));
//       return axios.get(url).then(response => {
//         if (response.data.result.records.length > 0) {
//           dispatch(showService(response.data.result.records));
//         }
//       });
//     };
//   }
// }

// function requestBuilder(searchVars) {
//   let theq =
//     searchVars.keyword && searchVars.keyword.length > 2
//       ? '&q=' + searchVars.keyword
//       : '';
//   let url = encodeURI(
//     `${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}${theq}&distinct=true${filters(
//       searchVars.category
//     )}`
//   );
//   if (searchVars.addressLatLng.latitude) url += '&limit=5000';
//   return url;
// }

// function checkLatLng(data) {
//   return data.filter(
//     r =>
//       r.PHYSICAL_ADDRESS.match(/\d+/g) !== null &&
//       r.LATITUDE !== '0' &&
//       r.LONGITUDE !== '0' &&
//       r.LATITUDE !== null &&
//       r.LONGITUDE !== null
//   );
// }

// function findNearMe(data, addressLatLng, radius) {
//   let filteredData = checkLatLng(data);
//   for (let i in filteredData) {
//     let isInside = geolib.isPointInCircle(
//       { latitude: addressLatLng.latitude, longitude: addressLatLng.longitude },
//       {
//         latitude: filteredData[i].LATITUDE,
//         longitude: filteredData[i].LONGITUDE
//       },
//       radius
//     ); // 25km radius
//     let distance = geolib.getDistance(
//       { latitude: addressLatLng.latitude, longitude: addressLatLng.longitude },
//       {
//         latitude: filteredData[i].LATITUDE,
//         longitude: filteredData[i].LONGITUDE
//       }
//     );
//     filteredData[i].NEARME = isInside;
//     filteredData[i].DISTANCE = distance;
//   }
//   return sortByDistance(filteredData.filter(r => r.NEARME === true));
// }

// function sortByDistance(data) {
//   return data.sort(function(a, b) {
//     if (a.DISTANCE < b.DISTANCE) return -1;
//     if (a.DISTANCE > b.DISTANCE) return 1;
//     return 0;
//   });
// }
