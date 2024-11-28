import axios, { type AxiosRequestConfig } from "axios"

import type { Ensemble } from "./types"

export const EnsembleService = {
  async getEnsemble({ ensembleId }: { ensembleId: string }) {
    try {
      const { data } = await axios.get<Ensemble>(
        `/api/v1/ensembles/${ensembleId}`,
        createAxiosConfig(),
      )
      return data
    } catch (error) {
      return null
    }
  },

  async getEnsembles({ page = 1 }: { page: number }) {
    try {
      const { data } = await axios.get<{
        data: Ensemble[]
        length: number
        total: number
      }>("/api/v1/ensembles", {
        params: { page },
        ...createAxiosConfig(),
      })
      return data
    } catch (error) {
      return {
        data: [],
        length: 0,
        total: 0,
      }
    }
  },

  async getUserEnsembles({ userId }: { userId: string }) {
    try {
      const { data } = await axios.get<{
        data: Ensemble[]
        length: number
      }>(`/api/v1/ensembles/users/${userId}`, createAxiosConfig())
      return data
    } catch (error) {
      return {
        data: [],
        length: 0,
      }
    }
  },
} as const

function createAxiosConfig(): AxiosRequestConfig {
  const { token } = JSON.parse<AuthSessionStorage>(
    sessionStorage.getItem("auth-storage")!,
  ).state

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }
}

export type AuthSessionStorage = {
  state: {
    token: string
  }
}
