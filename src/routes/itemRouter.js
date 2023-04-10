var express = require('express');
var app = express();
var itemRouter = express.Router();

// Required store route
var Item = require('../models/Item');

// Defined store route
itemRouter.route('/add/post').post(function(req, res, next) {
    var item = new Item(req.body);
    item.save()
    .then((item) => {
        res.json('Item added successfully');
    })
    .catch((err) => {
        res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
itemRouter.route('/').get(function(req, res, next) {
    Item.find(function(err, item) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
})

// Defined get data(index or listing) route
itemRouter.route('/getTestData').get(function(req, res, next) {
    const data = [{
        address: "8601 N 103rd Avenue #175",
        appx_sqft: 1089,
        public_remarks: "Spectacular 2 bed/2 bath home in Sun Garden Estates! This bright and open home features a split floor plan, vaulted ceilings, ample natural light, and neutral colors. The remodeled kitchen boasts new granite countertops, exquisite new cabinetry, and new stainless steel appliances. The property includes a spacious covered patio with sizable storage and an expansive backyard. All this in a quiet Peoria community with easy access to the loop 101. Welcome home!",
      },
      {
        address: "8601 N 103rd Avenue #175",
        appx_sqft: 1089,
        public_remarks: "Spectacular 2 bed/2 bath home in Sun Garden Estates! This bright and open home features a split floor plan, vaulted ceilings, ample natural light, and neutral colors. The remodeled kitchen boasts new granite countertops, exquisite new cabinetry, and new stainless steel appliances. The property includes a spacious covered patio with sizable storage and an expansive backyard. All this in a quiet Peoria community with easy access to the loop 101. Welcome home!",
      }
      ]
      res.json(data);
})


// Defined edit route
itemRouter.route('/edit/:id').get(function(req, res, next) {
    var id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});


// Defined update route
itemRouter.route('/update/:id').post(function(req, res, next) {
    Item.findById(req.params.id, function(err, item) {
        if(!item) {
            return next(new Error('could not load Document'));
        }
        else { // do your update here
            item.item = req.body.item;
            item.save().then(item => {
                res.json('Update complete');
            })
            .catch((err) => {
                res.status(400).send("unable to update the database");
            });
        }
    });
});


// Defined delete|remove|destroy route
itemRouter.route('/delete/:id').get(function(req, res, next) {
    Item.findByIdAndRemove({_id: req.params.id }, function(err, item) {
        if(err) {
            res.json(err);
        }
        else {
            res.json('Successfully removed');
        }
    });
});

module.exports = itemRouter;
