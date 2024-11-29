import { Client, Storage, Databases, ID, Query } from "appwrite";
import conf from "../../conf/conf";

class PostService {
  client;
  storage;
  databases;
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteEndPoint) // Replace with your Appwrite endpoint
      .setProject(conf.projectId); // Replace with your project ID

    this.storage = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  getFileURL(fileId){
    const fileURL = `${conf.appwriteEndPoint}/storage/buckets/${conf.bucketId}/files/${fileId}/view?project=${conf.projectId}`
    return fileURL;
  }

  async addPost({ userId, title, slug, content, file, status }) {
    console.log("file : " , file);
    
    const fileDetails = await this.uploadFile(file);

    const fileURL = this.getFileURL(fileDetails.$id);

    console.log("fileDetials : ", fileDetails);
    console.log("fileURL : ", fileURL);
    
    try {
      const userPost = await this.databases.createDocument(
        conf.databaseId,
        conf.articleCollectionId,
        slug, //we are using slug as unique id for each post
        {
          title,
          content,
          fileURL,
          userId,
          status,
        }
      );
      return userPost;
    } catch (error) {
      console.log(`Error in adding post to the appwrite : ${error}`);
      alert("post with same slug already exists");
    }
  }

  async updatePost(id, { title, slug , content, status, file }) {
    try {
      if (file) {
        let FileURL = await this.uploadFile(file).URL;
        const updateImage = await this.databases.updateDocument(
          conf.databaseId,
          conf.articleCollectionId,
          id,
          {
            FileURL,
          }
        );        
      }
      const updatedPost = await this.databases.updateDocument(
        conf.databaseId,
        conf.articleCollectionId,
        id,
        {
          slug,
          title,
          content,
          status,
        }
      );
      console.log("post updated successfully");
      return updatedPost;
    } catch (error) {
      console.log("error in updating post", error);
      throw error;
    }
  }

  async allPosts() {
    try {
      const allPosts = await this.databases.listDocuments(
        conf.databaseId,
        conf.articleCollectionId,
        Query.equal("status", "active")
      );
      console.log(`All posts fetched successfully`);
      return allPosts;
    } catch (error) {
      console.log(`Error in fetching all posts ${error}`);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.databaseId,
        conf.articleCollectionId,
        slug
      );
      console.log(`Post fetched successfully`);
      return post;
    } catch (error) {
      console.log(`Error in fetching post ${error}`);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseId,
        conf.articleCollectionId,
        sluf
      );
      console.log("post deleted successfully");
    } catch (error) {
      console.log("error in deleting post");
      throw error;
    }
  }

  async userPosts({ userId }) {
    try {
      const userPosts = await this.databases.listDocuments(
        conf.databaseId,
        conf.articleCollectionId,
        Query.equal("userId", userId)
      );
      console.log(`User posts fetched successfully`);
      return userPosts;
    } catch (error) {
      console.log(`Error in fetching user posts ${error}`);
      throw error;
    }
  }

  async uploadFile(file) {
    console.log("file : " , file);
    
    try {
      const response = await this.storage.createFile(
        conf.bucketId,
        ID.unique(), // Unique ID for the file
        file // The file to be uploaded
      );
      console.log("File uploaded successfully:", response);
      return response; // Contains file details like ID, URL, etc.
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const deleteFile = await this.storage.deleteFile(conf.bucketId, fileId);
      console.log("error in deleting file");
    } catch (error) {
      console.log("Error in deleting file", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.bucketId, fileId);
  }
}

export const postServices = new PostService();
