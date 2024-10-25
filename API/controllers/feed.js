exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/1.jpg",
      },
    ],
  });
};

exports.postPost = (req, res, next) => {
  const { title, content } = req.body;

  // CREATE POST IN DB!
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      id: new Date().toISOString(),
      title,
      content,
    },
  });
};
