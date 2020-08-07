// Function List New Search from other countries
function listNewsSearch(event) {
  event.preventDefault()

  $(`#news-page`).empty()


  $.ajax({

          method: `POST`,
          url: `http://localhost:3000/sports/news`,
          data: {
              country: $(`#source`).val()
          }
          // headers: {
          //     access_token: localStorage.access_token    
          // }
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



$(document).ready(function() {

  // Sport List, .sportListWeb
  $.ajax({
          method: 'GET',
          url: 'http://localhost:3000/sports/sportLists',
          // headers: {
          //     access_token: localStorage.access_token
          // }
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


  //Sports News, #home-after-login 
  $.ajax({
          method: `POST`,
          url: `http://localhost:3000/sports/news`,
          body: {
              country: 'us'
          },
          // headers: {
          //     access_token: localStorage.access_token
          // }
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



  //EnglandHomePage, .EnglandHomePage
  $.ajax('http://localhost:3000/sports/englandTeams', {
          method: 'GET'
      })
      .done((data) => {
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


})