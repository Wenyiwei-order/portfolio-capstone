const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const { protect } = require('../middleware/auth');

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/blog/:id
// @desc    Get single blog post with comments
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: { ...post.toObject(), comments } });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    req.body.author = req.user._id;
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private/Author
router.put('/:id', protect, async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Make sure user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this post' });
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private/Author
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Make sure user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });
    await post.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

// Comment routes
// @route   GET /api/blog/:postId/comments
// @desc    Get all comments for a post
// @access  Public
router.get('/:postId/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: comments.length, data: comments });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/blog/:postId/comments
// @desc    Create new comment
// @access  Private
router.post('/:postId/comments', protect, async (req, res, next) => {
  try {
    req.body.author = req.user._id;
    req.body.post = req.params.postId;

    // Check if post exists
    const post = await BlogPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    const comment = await Comment.create(req.body);
    await comment.populate('author', 'username');

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
