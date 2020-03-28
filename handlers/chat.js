const get = ({ response }) => {
  const stream = fs.createReadStream(path.join(rootDir, 'views', 'chat.html'));
  stream.pipe(response);
  stream.on('error', err => {
    logger.log(err);
  });
};

const getUsername = async ({ response }) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    await JSON.stringify({
      username: `user_${shortid.generate()}`,
    })
  );
};

const getMessages = async ({ response }) => {
  try {
    const data = await MessageModel.find({}).exec();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(await JSON.stringify(data));
  } catch (err) {
    logger.log(err);
  }
};
