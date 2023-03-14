const {
  getPosts,
  addPost,
  getPostById,
  changePostById,
  deletePostById,
} = require('../services/postsService');

// GET/api/posts => [...posts]
const getPostsController = async (req, res) => {
  const posts = await getPosts();
  res.json({posts, status: 'success'});
};

// GET/api/posts => {post with id 123}
const getPostByIdController = async (req, res) => {
  const {id} = req.params;
  const post = await getPostById(id);

  res.json({post, status: 'success'});
};

// POST/api/posts/<123> => [newPost, ...posts]
const addPostController = async (req, res) => {
  const {topic, text} = req.body;
  await addPost({topic, text});

  res.json({status: 'success'});
};

// PUT/api/posts/<123> => [changedPost, ...posts]
const changePostController = async (req, res) => {
  const {topic, text} = req.body;
  const {id} = req.params;

  await changePostById(id, {topic, text});
  res.json({status: 'success'});
};

// PATCH/api/posts/<123> => [changedAllPost, ...posts]
// const patchPost = (req, res) => {
// const { topic, text } = req.body;
// posts.forEach((post) => {
//   if (post.id === req.params.id) {
//     if (topic) post.topic = topic;
//     if (text) post.text = text;
//   }
// });
// res.json({ status: "success" });
// };

// DELETE/api/posts/<123> => {delete with id 123}
const deletePostController = async (req, res) => {
  const {id} = req.params;
  await deletePostById(id);
  res.json({status: 'success'});
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  // patchPost,
  deletePostController,
};
