// import axios from 'axios'

export const userdata = (data, repo) => {
  return {
    username: data.login,
    name: data.name,
    location: data.location,
    email: data.email,
    bio: data.bio,
    'avatar-url': data.avatar_url,
    titles: '//TODO',
    'favorite-language': favoritelanguage(languages(repos(repo))),
    'total-stars': totalstars(repos(repo)),
    'highest-starred': higheststars(repos(repo)),
    'public-repos': data.public_repos,
    'perfect-repos': perfectrepos(repos(repo)),
    followers: data.followers,
    following: data.following
  }
}

export const repos = data => {
  let arr = []
  for (let i = 0; i < data.length; i++) {
    arr[i] = repodata(data, i)
  }
  return arr
}

const repodata = (data, idx) => {
  return {
    fork: data[idx].fork,
    language: data[idx].language,
    stars: data[idx].stargazers_count,
    'open-issues': data[idx].open_issues_count
  }
}

const perfectrepos = repos => {
  let count = 0
  for (const obj of repos) {
    if (obj['open-issues'] === 0) {
      count++
    }
  }
  return count
}

const totalstars = repos => {
  let total = 0
  for (const obj of repos) {
    total += obj.stars
  }
  return total
}

const higheststars = repos => {
  let highest = 0
  for (const obj of repos) {
    if (obj.stars > highest) {
      highest = obj.stars
    }
  }
  return highest
}

const languages = repos => {
  let arr = []
  for (const obj of repos) {
    arr.push(obj.language)
  }
  return arr
}

const favoritelanguage = languages => {
  let arr = filter(languages)
  let count = new Array(languages.length)
  for (let i = 0; i < languages.length; i++) {
    count[arr.indexOf(languages[i])]++
    console.log(count[arr.indexOf(languages[i])])
  }

  return arr[highestCount(count)]
}

const highestCount = arr => {
  let highest = 0
  for (let elem of arr) {
    if (elem > highest) {
      highest = elem
    }
  }
  return highest
}

const filter = arr => {
  let result = []
  for (const elem of arr) {
    if (result.indexOf(elem) === -1) result.push(elem)
  }
  return result
}
