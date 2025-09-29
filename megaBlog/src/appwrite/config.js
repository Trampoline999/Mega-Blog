import conf from "../conf/conf.js";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteEndpoint)
      .setProject(conf.appWriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite createPostError : ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("Appwrite updateDocument Error : ", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite DeleteDocument Error", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite getPost Error", error);
    }
  }

  async getPosts(queries = [(Query.equal = "status")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID, 
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite getPosts Error", error);
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique,
        file
      );
    } catch (error) {
      console.log("Appwrite getFile Error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite delete Error", error);
    }
  }

  async filePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
  }
}

const appWriteService = new Service();
export default appWriteService;
