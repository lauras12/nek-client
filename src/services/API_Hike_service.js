import config from '../config';
import TokenService from './token-service';

const APIHikeCalls = {

    getAllUserHikes: () => {
        const URL = config.API_ENDPOINT + '/hikes';
        return fetch(URL, {
                headers: {
                    'Authorization': `bearer ${TokenService.getAuthToken()}`
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
    },

    postNewHike: (newHike) => {
        const URL = config.API_ENDPOINT + `/hikes/`;
        return fetch(URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                },
                body: JSON.stringify({
                    title: newHike.title
                })
            })
            .then(res => {
                if (!res.ok) {
                    res.json()
                        .then(err => {
                            console.log(err);
                            throw new Error(err.error.message);
                        });
                }
                return res;
            })
            .then(res => res.json());
    },

    insertTrackIntoHikes: (hikesTrack) => {
        const URL = config.API_ENDPOINT + `/hike-track`;
        return fetch(URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                },
                body: JSON.stringify({
                    main_hike_id: hikesTrack.main_hike_id,
                    track_id: hikesTrack.track_id,
                    section_hike_id: Number(hikesTrack.section_hike_id)
                }),
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
    },

    deleteTrackFromHike: (trackId, hikeId) => {
        const URL = config.API_ENDPOINT + `/delete/${hikeId}/${trackId}`;
        return fetch(URL, {
                method: 'DELETE',
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
                        });
                }
                return res;
            })
            .then(res => res.json());
    },

    getAllTracksInHike: (hikeId) => {
        const URL = config.API_ENDPOINT + `/hikes/${hikeId}`;
        return fetch(URL, {
                headers: {
                    'Authorization': `bearer ${TokenService.getAuthToken()}`
                },
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
    }
}

export default APIHikeCalls;