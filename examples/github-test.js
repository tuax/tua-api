const axios = require('axios');

// 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

(async () => {
  const result = await axios('repos/tuateam/tua-api', {
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: 'token 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',
    },
  })

  console.log(result)
})()
