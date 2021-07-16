const axios = require('axios');


export const fetchDogBreed = () => {
    return axios.get('https://dog.ceo/api/breeds/list/all').then(res => {
        const breedKeys = res.data.message;
        //get first breed in res object
        for (const key in breedKeys) {
            return key;
        }
    }).catch(err => {
        console.log(err);
        return err;
    })
}

export const getRandomBreedImage = (breed) => {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images/random`).then(res => {
        return res.data.message;
    }).catch(err => {
        console.log(err);
        return err;
    })
}
