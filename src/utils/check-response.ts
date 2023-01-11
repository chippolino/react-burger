export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json()
    : res.json().then((err: Promise<string>) => Promise.reject(err))
}
