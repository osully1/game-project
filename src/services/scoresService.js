const BASE_URL = 'https://scopa-backend.herokuapp.com/api/scores'

export function fetchScoreData() {
    return fetch(BASE_URL).then(res => res.json())
}