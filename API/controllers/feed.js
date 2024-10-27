exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "123",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/1.jpg",
        creator: {
          name: "Murga",
        },
        createdAt: new Date(),
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
      _id: new Date().toISOString(),
      title,
      content,
      creator: { name: "Murga" },
      createdAt: new Date(),
    },
  });
};
