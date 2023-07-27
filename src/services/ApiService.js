export async function signup(userDetails) {
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch(`${process.env.REACT_APP_serverURL}/user/create`,  {
      headers:{
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    if(response.status !== 200) {
      const json = response.json()
      return Promise.resolve(json)
    }else {
      const json = response.json()
      return Promise.resolve(json)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function linkToken() {
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/link-token`,  {
      headers:{
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'    
      },
      method: 'POST',
      body: JSON.stringify({
        'userId': '642eca73e504cb20a953eba6'
      }),
    })
    if(response.status !== 200) {
      throw Error('Failed Fetch')
    }else {
      const json = response.json()
      return Promise.resolve(json)
    }

    
  } catch (error) {
    return Promise.reject(error)
  }
}

