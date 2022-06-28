const postData = require("../data/data");

class Post {
  super(data) {
    this.author = postData.Author;
    this.description = postData.Description;
    this.postID = postData.postID;
    this.timestamp = postData.Timestamp;
  }

  static addPost(data) {
    let newPost = new Post({ ...data });
    postData.push(newPost);
    console.log(newPost);
    return newPost;
  }
}

module.exports = Post;
