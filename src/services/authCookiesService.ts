export const getAuthCookie = async () => {
  const response = await fetch('/api/getAuthCookie')
  const data = await response.json()
  return data
};

export const setAuthCookie = async (token: string) => {
  await fetch('/api/setAuthCookie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })
}

export const deleteAuthCookie = async () => {
  const response = await fetch("/api/deleteAuthCookie", {
    method: "POST"
  })

  return response
}