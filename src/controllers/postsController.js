const {
  getPosts,
  addPost,
  getPostById,
  changePostById,
  deletePostById,
} = require('../services/postsService');

// GET/api/posts => [...posts]
const getPostsController = async (req, res) => {
  const {_id: userId} = req.user;

  const posts = await getPosts(userId);
  res.json({posts, status: 'success'});
};

// GET/api/posts => {post with id 123}
const getPostByIdController = async (req, res) => {
  const {id: postId} = req.params;
  const {_id: userId} = req.user;

  const post = await getPostById(postId, userId);

  res.json({post, status: 'success'});
};

// POST/api/posts/<123> => [newPost, ...posts]
const addPostController = async (req, res) => {
  const {topic, text} = req.body;
  const {_id: userId} = req.user;

  await addPost({topic, text}, userId);

  res.json({status: 'success'});
};

// PUT/api/posts/<123> => [changedPost, ...posts]
const changePostController = async (req, res) => {
  const {topic, text} = req.body;
  const {id: postId} = req.params;
  const {_id: userId} = req.user;

  await changePostById(postId, {topic, text}, userId);
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
  const {id: postId} = req.params;
  const {_id: userId} = req.user;

  await deletePostById(postId, userId);
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
