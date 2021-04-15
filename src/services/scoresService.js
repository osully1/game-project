const BASE_URL = 'http://localhost:3001/api/scores'

export function fetchScoreData() {
    return fetch(BASE_URL).then(res => res.json())
}