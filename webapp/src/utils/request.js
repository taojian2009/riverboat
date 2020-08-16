import axios from 'axios'

function parseJSON (response) {
    return response.data
}

export default function request(url, options) {
    const axiosPromise =
        typeof url === 'string' ? axios(url, options) : axios(url)
    return axiosPromise
        .then(parseJSON)
}

