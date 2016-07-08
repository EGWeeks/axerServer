'use strict';

var Table = require('../../db/knex'),
    Posts = Table('posts');
   
// POST ‘/new’ - creates individual
function newPostHandler(req, res) {

  //Created at date
  var today = new Date();

  //Creating a new date 
  var expire = new Date();
  //milliExpire is 30 days from right now 
  //returns millseconds
  var milliExpire = expire.setDate(expire.getDate() + 30);
  //milliExpire is 30 days from date in milliseconds
  //formattedExpire formats milliseond to normailized data
  //(example: Thu Mar 17 2016 20:10:51 GMT-0600 (MDT))
  var formattedExpire = new Date(milliExpire);
  
  var post = {};
  
  post.user_id    = req.body.user_id;
  post.type       = req.body.type;
  post.sport      = req.body.sport;
  post.avail      = req.body.avail;
  post.desc       = req.body.desc;
  post.rate       = req.body.rate;
  post.location   = req.body.location;
  post.lat        = req.body.lat;
  post.lng        = req.body.lng;
  post.created_at = today;
  post.expiration = formattedExpire;
  //newly created posts get a default value of 'active'
  post.status     = 'Active';

  Posts()
    .insert(post)
    .then(function(postInfo) {
      console.log(postInfo);
      res.json(postInfo);
    })
    .catch(function(err) {
      res.send('Error handling your post submission. Error: ' + err);
    });

}

module.exports = newPostHandler;