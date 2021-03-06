import axios, {AxiosRequestConfig} from 'axios'
import * as ls from 'local-storage'
import {User} from '../shared/models'

const BASE_URL = 'http://localhost:8080'

async function request (params: AxiosRequestConfig) {
  // add accessToken to request if user logged in
  const loggedUser: User = ls.get('login')
  const {accessToken} = loggedUser || {}
  if (accessToken) {
    params.headers = {
      ...params.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return axios({
    baseURL: BASE_URL,
    ...params,
  })
}

export async function login (username: string, password: string) {
  return request({
    url: '/login',
    method: 'post',
    auth: {
      username,
      password,
    },
  })
}

export async function signUp (email: string, password: string) {
  return request({
    url: '/signup',
    method: 'post',
    data: {
      email,
      password,
    },
  })
}

export async function listMonitors () {
  return request({
    url: '/monitor/list',
  })
}

export async function deleteMonitor (id) {
  return request({
    url: '/monitor',
    method: 'delete',
    params: {
      id,
    },
  })
}

export async function saveMonitor (data) {
  return request({
    url: '/monitor',
    method: 'put',
    data,
    params: {
      id: data.id,
    },
  })
}

export async function createMonitor ({
  url,
  name,
  monitoredIntervalSeconds,
}) {
  return request({
    url: '/monitor',
    method: 'post',
    data: {
      url,
      name,
      monitoredIntervalSeconds,
    },
  })
}

export async function getResults (monitorId: string) {
  return request({
    url: '/results',
    params: {
      monitorId,
    },
  })
}

export async function getMonitoringState (userId: string) {
  return request({
    url: '/monitoring',
    params: {
      userId,
    },
  })
}
