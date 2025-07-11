const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator');

const io = require('../socket');
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate('creator')
      .sort({createdAt: -1})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    
    res.status(200).json({ 
        message: 'Fetched posts successfully',
        posts: posts, 
        totalItems: totalItems 
      });
    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500;
      }
      next(error);
    }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed, entered data is incorret.');
    error.statusCode = 422;
    throw error;
  }
  if(!req.file) {
    const error = new Error('no image provided');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;
  const post = new Post({
    title: title, 
    content: content, 
    imageUrl: imageUrl,
    creator: req.userId,
  });
  try {
    await post.save();
    const user = await User.findById(req.userId);
      user.posts.push(post);
    await user.save();
    io.getIO().emit('posts', {
      action: 'create', 
      post: {...post._doc, creator: {_id: user._id, name: user.name}}
    });
    res.status(201).json({
      message: 'Post created successfully',
      post: post,
      creator: { _id: user._id, name: user.name }
    });
  } catch (err) {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId)
    try {
      if (!post) {
        const error =  new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({message: 'Post fetched', post: post});
    } catch(err) {
      if (!err.statusCode){
        err.statusCode = 500;
      }
      next(err);
    };
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed, entered data is incorret.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('no file picked');
    error.statusCode = 422;
    throw error
  }
  const post = await Post.findById(postId).populate('creator');
    try {
      if (!post) {
        const error =  new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator._id.toString() !== req.userId){
        const error = new Error('Not authorized');
        error.statusCode = 403;
        throw error;
      }
      if(imageUrl !== post.imageUrl){
        clearImage(post.imageUrl);  
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      const result = await post.save();
      io.getIO().emit('posts', {
        action: 'update',
        post: {...result}
      });
      res.status(200).json({ message: 'Post updated!', post: result });
    }  catch(err) {
      if (!err.statusCode){
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId)
      if (!post) {
        const error =  new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId){
        const error = new Error('Not authorized');
        error.statusCode = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      await  Post.findByIdAndDelete(postId);
    
      const user = await User.findById(req.userId);
      user.posts.pull(postId);
      await user.save();
      io.getIO().emit('posts', {
        action: 'delete', 
        postId: postId
      })
    
      res.status(200).json({ message: 'Deleted post' });
  } catch(err) {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      next(err);
    };
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};