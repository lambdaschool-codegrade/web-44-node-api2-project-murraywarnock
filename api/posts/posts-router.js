// implement your posts router here
const express = require('express');
const Post = require('./posts-model');

const router = express.Router();
// Returns an array of all the post objects contained in the database
router.get("/", async (req, res) => {
    try {
    const posts = await Post.find()
    res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    }
});

// Returns the post object with the specified id
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    } catch (error) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
});

// Creates a post using the information sent inside the request body and returns the newly created post object
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
    Post.insert({ title, contents })
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(post => {
            if (post) {
                return res.status(201).json(post)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "There was an error while saving the post to the database" });
      });
    }
});
// Updates the post with the specified id using data from the request body and returns the modified document, not the original
router.put('/:id', (req, res) => {
    const updates = req.body;
    if (!updates.title || !updates.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" })
    }
    Post.update(req.params.id, updates)
      .then(post => {
        if (post) {
///****************************/// Embedded find by id
            Post.findById(req.params.id)
            .then(post => {
                if (post) {
                    return res.status(200).json(post)
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist"})
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: error.message
                });
            });
///****************************///        
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "The post information could not be modified" });
      });
  });
// Removes the post with the specified id and returns the deleted post object
router.delete('/:id', (req, res) => {
// First get the post to be deleted
    Post.findById(req.params.id)
    .then(post => {
        if (post) {
            //  res.status(200).json(post)
            // Then remove the post
             Post.remove(req.params.id)
             .then(count => {
               if (count > 0) {
                 res.status(200).json(post);
               } else {
                 res.status(404).json({ message: 'The post could not be found' });
               }
             })
             .catch(error => {
               console.log(error);
               res.status(500).json({
                 message: 'Error removing the post',
               });
             });



        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
.catch(error => {
    res.status(500).json({
        message: error.message
    });
});
    Post.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The post has been deleted' });
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      });
  });

// Returns an array of all the comment objects associated with the post with the specified id
  router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findCommentById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

module.exports = router;