"use server"

import { type ActionResult, error, success } from "./utils"
import { newsletterSchema } from "./schema"

export const subscribe = async (email: string): Promise<ActionResult<string>> => {
  const parsed = newsletterSchema.safeParse({ email })

  if (!parsed.success) {
    return error(parsed.error.message)
  }

  // Simulate a small delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 500))

  return success("Thank you for subscribing!")
}

export const getDemoState = async () => {
  return false
}
