/* eslint-disable no-undef */
$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      document.getElementsByClassName('username')[0].innerHTML = data.username
      document.getElementsByClassName('full-name')[0].innerHTML = data.name
      document.getElementsByClassName('location')[0].innerHTML = data.location
      document.getElementsByClassName('email')[0].innerHTML = data.email
      document.getElementsByClassName('bio')[0].innerHTML = data.bio
      document.getElementsByClassName('avatar')[0].src = data['avatar-url']
      document.getElementsByClassName('titles value')[0].src = data.titles
      document.getElementsByClassName('favorite-language value')[0].src =
        data['favorite-language']
      document.getElementsByClassName('total-stars value')[0].innerHTML =
        data['total-stars']
      document.getElementsByClassName('most-starred value')[0].innerHTML =
        data['highest-starred']
      document.getElementsByClassName('public-repos value')[0].innerHTML =
        data['public-repos']
      document.getElementsByClassName('perfect-repos value')[0].innerHTML =
        data['perfect-repos']
      document.getElementsByClassName('followers value')[0].innerHTML =
        data.followers
      document.getElementsByClassName('following value')[0].innerHTML =
        data.following

      $('.user-results').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
    })

  return false // return false to prevent default form submission
})
