"use server"

import type { EnvCheckAction } from "@joycostudio/v0-setup"

export const checkEnvs: EnvCheckAction = async () => {
  return {
    envs: [],
    allValid: true,
  }
}
