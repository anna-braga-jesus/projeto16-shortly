

async function URL (req, res, next) {
    const url = req.body.url;
    const code = generateCode();
   
    res.send(`${process.env.DOMAIN}${code}`);
  }

export default URL;