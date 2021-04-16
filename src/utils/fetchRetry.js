export const fetchRetry = async(client, command, options = {}, retries = 3, backoff = 300, source = 'unknown') => {
  console.log('in fetch retry !!!!!!! from: ', source)
  try{
    const inputCommand = command
    const inputClient = client
    const inputOptions = options
    const inputBackoff = backoff
    const result = await client.send(new command(options))
    if(result.Status == 'FINISHED'){
      console.log('funtion result is finished')
      return 'success'
    }
    else if(result.Status == 'STARTED'){
      console.log('it is started', 'retries', retries)
      if (retries > 0) {
        setTimeout(() => {
          /* 2 */
          console.log('requesting again')
          return fetchRetry(inputClient, inputCommand, retries - 1, inputBackoff * 2) /* 3 */
        }, backoff)
      // return 'stratd'
      }
    }
    else{
      console.log('neither started or finished', result)
      return 'weird'
    }
    console.log('funtion result', result)
  }
  catch(e){
    return e
  }
}
  /* 1 */
// function fetchRetry(url, options = {}, retries = 3, backoff = 300) {
//   /* 1 */
//   const retryCodes = [408, 500, 502, 503, 504, 522, 524]
//   return fetch(url, options)
//     .then(res => {
//       if (res.ok) return res.json()

//       if (retries > 0 && retryCodes.includes(res.status)) {
//         setTimeout(() => {
//           /* 2 */
//           return fetchRetry(url, options, retries - 1, backoff * 2) /* 3 */
//         }, backoff) /* 2 */
//       } else {
//         throw new Error(res)
//       }
//     })
//     .catch(console.error)
// }

// const requestRedshift = async(dbName) =>{