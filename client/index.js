function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token
    $.ajax('http://localhost:3000/googleLogin', {
        method: 'POST',
        headers: {
            google_token
        }
    })
        .done(data => {
            localStorage.token = data.token
            $('#loginPage').hide()
            $('#homePage').show()
            $('#registerPage').hide() 
        })
        .fail(err => {
            console.log(err);
            
        })
        .always(() => console.log('selesai'))
  }