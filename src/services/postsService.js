const {Post} = require('../db/postModel');
const {WrongParametersError} = require('../helpers/errors');

const getPosts = async (userId, {skip, limit}) => {
  const posts = await Post.find({userId})
      .select({__v: 0})
      .skip(skip)
      .limit(limit)
      .sort({topic: -1});
  return posts;
};

const getPostById = async (postId, userId) => {
  const post = await Post.findOne({_id: postId, userId});
  if (!post) {
    throw new WrongParametersError(
        `failure, no posts with id '${postId}' found!`
    );
  }
  return post;
};

const addPost = async ({topic, text}, userId) => {
  const post = new Post({topic, text, userId});
  await post.save();
};

const changePostById = async (postId, {topic, text}, userId) => {
  const post = await Post.findOneAndUpdate(
      {_id: postId, userId},
      {$set: {topic, text}}
  );
  if (post.modifiedCount === 0) {
    return res
        .status(400)
        .json({status: `failure, no post with id '${postId}' found!`});
  }
};

const deletePostById = async (postId, userId) => {
  const post = await Post.findOneAndRemove({_id: postId, userId});
  if (!post) {
    throw new WrongParametersError(
        `failure, no posts with id '${postId}' found!`
    );
  }
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
};