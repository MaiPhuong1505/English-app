const SAPLING_API_URL = 'https://api.sapling.ai';
const API_KEY = process.env.SAPLING_API_KEY;
const grammarController = {
  grammarCheck: (req, res, next) => {
    // remove the '/sapling/' prefix from the request path
    let requestPath = req.path.substring(8);
    // pass request path along to Sapling
    let requestUrl = `${SAPLING_API_URL}${requestPath}`;
    // add the API Key
    req.body.key = API_KEY;
    axios({
      url: requestUrl,
      data: req.body,
      method: 'post',
    }).then(function (response) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response.data));
    });
  },
};

export default grammarController;
