import config from '../config';
import TokenService from './token-service';


const APITrackCalls = {

    getAllTracksData: () => {
        const URL = config.API_ENDPOINT + '/tracks';

        return fetch(URL)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            console.log(err);
                            throw new Error(err.error.message);
                        });
                }
                return res;
            })
            .then(res => res.json());
    },

    insertTrackAttributes: (element) => {
        const { track_id } = element;
        const URL = config.API_ENDPOINT + `/hikeatt/${track_id}`;
        return fetch(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(element),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            console.log(err);
                            throw new Error(err.error.message);
                        });
                }
                return res;
            })
            .then(res => res.json());
    },

    insertTrackNotes: (note) => {
        const { track_id } = note;
        const URL = config.API_ENDPOINT + `/hikenote/${track_id}`;
        return fetch(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(note),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            console.log(err);
                            throw new Error(err.error.message);
                        });
                }
                return res;
            })
            .then(res => res.json());
    },

    getFullTrackData: (hikeId, trackId) => {
        const URL = config.API_ENDPOINT + `/hike/${hikeId}/${trackId}`;
        return fetch(URL, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            console.log(err);
                            throw new Error(err.error.message);
                        })
                }
                return res;
            })
            .then(res => res.json());
    }
}

export default APITrackCalls;