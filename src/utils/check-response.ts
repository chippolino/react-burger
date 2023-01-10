export function checkResponse(res: Response): Promise<any> {
  return res.ok
    ? res.json()
    : res.json().then((err: Promise<string>) => Promise.reject(err))
}
