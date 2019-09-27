import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import token from '../../token'

import { userdata, repos } from '../lib/profile'
import validation from './validation'
import { rejects } from 'assert'

export default () => {
  let router = Router()
  const getUser = username => {
    return axios.get(`http://api.github.com/users/${username}`, {
      headers: {
        Authorization: token
      }
    })
  }
  const getRepos = username => {
    return axios.get(`http://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: token
      }
    })
  }

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    console.log(req.params)
    axios
      .all([getUser(req.params.username), getRepos(req.params.username)])
      .then(
        axios.spread((user, repos) => {
          res.json(userdata(user.data, repos.data))
        })
      )
      .catch(err => {
        console.log(err)
      })
  })

  /** GET /api/users? - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    console.log(req.query)
    console.log(req.query.username[1])
    axios
      .all([
        getUser(req.query.username[0]),
        getRepos(req.query.username[0]),
        getUser(req.query.username[1]),
        getRepos(req.query.username[1])
      ])
      .then(
        axios.spread((firstuser, firstrepo, seconduser, secondrepo) => {
          res.json(
            userdata(
              firstuser.data,
              firstrepo.data,
              seconduser.data,
              secondrepo.data
            )
          )
        })
      )
      .catch(err => {
        console.log(err)
      })
  })

  return router
}
