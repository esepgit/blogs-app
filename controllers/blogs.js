const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title && !body.url) {
      response.status(400).end()
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response, next) => {
    try{
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch(exception) {
      next(exception)
    }
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(updatedBlog)
    } catch(exception) {
      next(exception)
    }
    
  })

  module.exports = blogsRouter