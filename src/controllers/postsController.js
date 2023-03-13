const {ObjectId} = require('mongodb');

// GET/api/posts => [...posts]
const getPost = async (req, res) => {
  const posts = await req.db.Posts.find({}).toArray();
  res.json({posts, status: 'success'});
};

// GET/api/posts => {post with id 123}
const getPostById = async (req, res) => {
  const {id} = req.params;
  const post = await req.db.Posts.findOne({_id: new ObjectId(id)});

  if (!post) {
    return res
        .status(400)
        .json({status: `failure, no posts with id '${id}' found!`});
  }

  res.json({post, status: 'success'});
};

// POST/api/posts/<123> => [newPost, ...posts]
const addPost = async (req, res) => {
  const {topic, text} = req.body;
  await req.db.Posts.insertOne({topic, text});

  res.json({status: 'success'});
};

// PUT/api/posts/<123> => [changedPost, ...posts]
const changePost = async (req, res) => {
  const {topic, text} = req.body;
  const {id} = req.params;

  const post = await req.db.Posts.updateOne(
      {_id: new ObjectId(id)},
      {$set: {topic, text}},
  );

  if (post.modifiedCount === 0) {
    return res
        .status(400)
        .json({status: `failure, no post with id '${id}' found!`});
  }
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
const deletePost = async (req, res) => {
  const {id} = req.params;
  const result = await req.db.Posts.deleteOne({_id: new ObjectId(id)});

  if (result.deletedCount === 0) {
    return res
        .status(400)
        .json({status: `failure, no post with id '${id}' found!`});
  }
  res.json({status: 'success'});
};

module.exports = {
  getPost,
  getPostById,
  addPost,
  changePost,
  // patchPost,
  deletePost,
};
