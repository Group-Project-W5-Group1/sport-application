const axios = require("axios");

class Controller {
    static getEnglandTeams(req, res, next) {
        axios({
                method: "GET",
                url: "https://api.football-data.org/v2/competitions/2021/standings",
                headers: {
                    'X-Auth-Token': '7c12f6e035c2497b9feea7a97ffcb52f'
                },
                params: {
                    standingType: 'HOME'
                }
            })
            .then((response) => {
                // console.log(response.data)
                res.status(200).json(response.data)
            })
            .catch((error) => {
                next(error)
            })
    }

    static getEnglandNews(req, res, next) {
        axios({
                method: "GET",
                url: "http://newsapi.org/v2/top-headlines",
                params: {
                    country: req.body.country,
                    apiKey: 'ec7933d6edb844a78f75634844a528b1',
                    category: 'sports'
                }
            })
            .then((response) => {
                res.status(200).json(response.data.articles)
            })
            .catch((error) => {
                next(error)
            })
    }

    static getSportLists(req, res, next) {
        axios({
                method: "GET",
                url: 'https://www.thesportsdb.com/api/v1/json/1/all_sports.php'
            })
            .then((response) => {
                res.status(200).json(response.data.sports)
            })
            .catch((error) => {
                next(error)
            })
    }

}

module.exports = Controller