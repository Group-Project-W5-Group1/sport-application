$(document).ready(function() {

    if (localStorage.access_token) {
        homeAfterLogin()
    } else {
        homeBeforeLogin()
    }
})


function homeAfterLogin() {
    HomeAfterLoginPart()
    $(`#home-after-login`).show()
    $(`#login-button`).hide()
    $(`#form-login`).hide()
    $(`#form-register`).hide()
    $(`#home-before-login`).hide()
    $(`#logout-button`).show()
}

function homeBeforeLogin() {
    $('.EnglandHomePage').hide()
    $('.sportListWeb').hide()
    $(`#logout-button`).hide()
    $(`#form-login`).show()
    $(`#form-register`).hide()
    $(`#home-after-login`).hide()
    $(`#home-before-login`).show()
    $(`#login-button`).show()
    $(`#after-page-search`).hide()
}

// Function List New Search from other countries

function listNewsSearch(event) {
    event.preventDefault()

    $(`#news-page`).empty()


    $.ajax({

            method: `POST`,
            url: `http://localhost:3000/sports/news`,
            data: {
                country: $(`#source`).val()
            },
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(data => {
            console.log(data)
            if (data.totalResults == 0) {
                $(`#news-page`).text(`We are apologize, currently we can't find any news for you. Please try again later.`)
            }
            data.forEach(element => {
                if (element.content !== null) {
                    $(`#news-page`).append(`
                    <div class="card mb-3">
                        <img src="${element.urlToImage}" class="card-img-top" alt="news-image.jpg">
                        <div class="card-body">
                        <h5 class="card-title font-weight-bold">${element.title}</h5>
                        <p class="card-text">${element.content}</p>
                        <p>source: <span>${element.source.name}</span> <a target="_blank" href="${element.url}">${element.url}</a></p>
                        <p class="card-text"><small class="text-muted">Published at ${new Date(element.publishedAt).toDateString()}</small></p>
                        </div>
                    </div>
                    `)
                }
            });
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {})
}

function showEnglandLeague(event) {
    //EnglandHomePage, .EnglandHomePage
    $('.EnglandHomePage').show()
    $('.sportListWeb').hide()
    $('#home-after-login').hide()
    $.ajax('http://localhost:3000/sports/englandTeams', {
            method: 'GET',
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done((data) => {
            console.log(data);
            data.standings[0].table.forEach(el => {
                $('#listGroup').append(`
         <tr>
                <td>${el.position}</td>
                <td>${el.team.name}</td>
                <td><img src="${el.team.crestUrl}" class="crestLogo" alt="crest ${el.team.name}"></td>
                <td>${el.playedGames}</td>
                <td>${el.won}</td>
                <td>${el.draw}</td>
                <td>${el.lost}</td>
                <td>${el.points}</td>
                <td>${el.goalsFor}</td>
                <td>${el.goalsAgainst}</td>
                <td>${el.goalDifference}</td>
        </tr>
         `)
            });
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })
}

function HomePageButton(event) {
    $('.EnglandHomePage').hide()
    $('.sportListWeb').hide()
    $('#home-after-login').show()
}

function loginButton() {
    loginPage()
}

function loginPage() {
    $(`#loginEmail`).val(``)
    $(`#loginPassword`).val(``)
    $(`#form-login`).show()
    $(`#home-before-login`).hide()
    $(`#form-register`).hide()
    $(`#logout-button`).hide()
    $(`#home-after-login`).hide()
    $(`#login-button`).show()
}


function showSportsList(evet) {
    $('.EnglandHomePage').hide()
    $('.sportListWeb').show()
    $('#home-after-login').hide()

    $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/sports/sportLists',
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(data => {
            data.forEach(el => {
                $(`#sportsLists`).append(`
        <div class="card mb-3">
            <img src="${el.strSportThumb}" class="card-img-top" alt="news-image.jpg">
            <div class="card-body">
            <h5 class="card-title font-weight-bold display-3">${el.strSport}</h5>
            <p class="card-text">${el.strSportDescription}</p>
            </div>
        </div>
        `)

            });
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {})

}

function HomeAfterLoginPart() {
    $('.EnglandHomePage').hide()
    $('.sportListWeb').hide()
    $.ajax({
            method: `POST`,
            url: `http://localhost:3000/sports/news`,
            body: {
                country: 'us'
            },
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(data => {
            if (data.length == 0) {
                $(`#news-page`).text(`We are apologize, currently we can't find any news for you. Please try again later.`)
            }
            data.forEach(el => {
                if (el.content != null) {
                    $(`#news-page`).append(`
            <div class="card mb-3">
                <img src="${el.urlToImage}" class="card-img-top" alt="news-image.jpg">
                <div class="card-body">
                <h5 class="card-title font-weight-bold">${el.title}</h5>
                <p class="card-text">${el.content}</p>
                <p>source: <span>${el.source.name}</span> <a target="_blank" href="${el.url}">${el.url}</a></p>
                <p class="card-text"><small class="text-muted">published at ${new Date(el.publishedAt).toDateString()}</small></p>
                </div>
            </div>
            `)
                }
            });
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {})
}

function RegisterPage(event) {
    $(`#form-register`).show()
    $(`#form-login`).hide()
}

function registerButton() {
    registerPage()
}

function registerPage() {
    $(`#form-login`).hide()
    $(`#home-before-login`).hide()
    $(`#form-register`).show()
    $(`#logout-button`).hide()
    $(`#home-after-login`).hide()
    $(`#login-button`).show()
    $(`#registerEmail`).val(``)
    $(`#registerPassword`).val(``)
    $(`#registerName`).val(``)
}

function registerForm(event) {
    event.preventDefault()
    const email = $(`#registerEmail`).val()
    const password = $(`#registerPassword`).val()

    $(`#alertRegister`).empty()
    $.ajax({
            method: `POST`,
            url: `http://localhost:3000/register`,
            data: {
                email: email,
                password: password,

            }
        })
        .done((result) => {
            console.log(result)
            $(`#alertRegister`).append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                successfully registered! Please sign in to surf in our Portal News!        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
        })
        .fail((err) => {
            // console.log(err)
            let errors = err.responseJSON.errors
            errors.forEach(element => {
                $(`#alertRegister`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${element.message}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
            });
        })
        .always(() => {
            console.log(`tes`)
            $(`#registerEmail`).val(``)
            $(`#registerPassword`).val(``)
            $(`#registerName`).val(``)
        })
}

function loginForm(event) {
    event.preventDefault()
    const email = $(`#loginEmail`).val()
    const password = $(`#loginPassword`).val()
    $(`#alertLogin`).empty()
    $.ajax({
            method: `POST`,
            url: `http://localhost:3000/login`,
            data: {
                email: email,
                password: password
            }
        })
        .done((result) => {
            localStorage.access_token = result.access_token
            homeAfterLogin()
        })
        .fail((err) => {
            console.log(err.responseJSON.errors)
            $(`#alertLogin`).append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err.responseJSON.errors[0].message}        
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`)
        })
        .always(() => {
            console.log(`tes`)
            $(`#loginEmail`).val(``)
            $(`#loginPassword`).val(``)
        })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: `POST`,
            url: `http://localhost:3000/login/google`,
            data: {
                id_token
            }
        })
        .done((result) => {
            localStorage.setItem(`access_token`, result.access_token)
            homeAfterLogin()
        })
        .fail((err) => {
            console.log(err)
        })
        .always(() => {

        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}

function logoutButton() {
    localStorage.clear()
    homeBeforeLogin()
    signOut()
}