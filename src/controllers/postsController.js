let posts = [
  {id: '1', topic: 'test1', text: 'test text1'},
  {id: '2', topic: 'test2', text: 'test text2'},
  {id: '3', topic: 'test3', text: 'test text3'},
];

// GET/api/posts => [...posts]
const getPost = (req, res) => {
  res.json({posts, status: 'success'});
};

// GET/api/posts => {post with id 123}
const getPostById = (req, res) => {
  const [post] = posts.filter((it) => it.id === req.params.id);

  if (!post) {
    return res
        .status(400)
        .json({status: `failure, no posts with id '${req.params.id}' found!`});
  }

  res.json({post, status: 'success'});
};

// POST/api/posts/<123> => [newPost, ...posts]
const addPost = (req, res) => {
  const {topic, text} = req.body;

  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });
  res.json({status: 'success'});
};

// PUT/api/posts/<123> => [changedPost, ...posts]
const changePost = (req, res) => {
  const {topic, text} = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({status: 'success'});
};

// PATCH/api/posts/<123> => [changedAllPost, ...posts]
const patchPost = (req, res) => {
  const {topic, text} = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      if (topic) post.topic = topic;

      if (text) post.text = text;
    }
  });
  res.json({status: 'success'});
};

// DELETE/api/posts/<123> => {delete with id 123}
const deletePost = (req, res) => {
  posts = posts.filter((it) => it.id !== req.params.id);
  res.json({status: 'success'});
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
