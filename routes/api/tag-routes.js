const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

 Tag.findAll( {
    attributes: ['id', 'tag_name'],
    include:  
      {
      model: Product,
      attributes: ['id','product_name','price', 'stock', 'category_id']
      },
     
  })
    .then(tagData => {
      if(!tagData) {
        res.status(404).json({message: 'Sorry! No tags found.'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });


});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: 
      {
      model: Product,
      attributes: ['id','product_name','price', 'stock', 'category_id']
      },
  })
    .then(tagData => {
      if(!tagData) {
        res.status(404).json({message: 'Sorry! No tags with that id found'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });


});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({message:'Sorry, There are no tags found with that id.'});
        return;
      }
      console.log('Tag has been updated!')
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData){
        res.status(404).json({message: 'Sorry, There were no tags found with that id.'});
        return;
      }
      console.log('Tag has been deleted!')
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
