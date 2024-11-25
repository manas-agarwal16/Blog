const conf = {
    // String() just for securify ki agar koi variable me sirf number ho toh import.meta.env number na assume krle
    appwriteEndPoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT) , 
    projectId : String(import.meta.env.VITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_DATABASE_ID),
    articleCollectionId : String(import.meta.env.VITE_ARTICLES_COLLECTION_ID),
    bucketId : String(import.meta.env.VITE_BUCKET_ID),
}

export default conf