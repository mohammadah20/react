import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
//یه آبجکت از کلاس Client می‌سازیم
//این Client در واقع رابط بین برنامه‌ی React (یا فرانت‌اند ) و سرور Appwrite هست
//همه درخواست‌ها (CRUD = Create, Read, Update, Delete) از طریق این client فرستاده می‌شن
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  
 try {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal('searchTerm', searchTerm),//برو داخل دیتابیس با شناسه DATABASE_ID وواز کالکشن با شناسه COLLECTION_ID وهمه‌ی Documentهایی رو پیدا کن که مقدار فیلدی به اسم searchTerm دقیقاً برابر با مقداری باشه که من به تابع دادم (یعنی searchTerm ورودی)
  ])


  if(result.documents.length > 0) {
   const doc = result.documents[0];

   await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
    count: doc.count + 1,  //این خط سند موجود را آپدیت می‌کند و مقدار فیلد count را یک واحد افزایش می‌دهد.
   })

  } else {
   await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    searchTerm,
    count: 1,
    movie_id: movie.id,
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
   })
  }
 } catch (error) {
  console.error(error);
 }
}

export const getTrendingMovies = async () => { //گرفتن لیستی از «فیلم‌های ترند» (بر اساس شمارش/count) از Appwrite.
 try {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.limit(5), // تعداد سندات که بر می گردونه 5 تا باشه یعنی 5 تا فیلم که بیشترین سرچ را داشته برگردانده باشه 
    Query.orderDesc("count")//این کوئری مشخص می‌کند که اسناد بر اساس فیلدی به نام "count" به صورت نزولی مرتب شوند (بزرگ‌ترین مقدار اول).
  ])

  return result.documents;
 } catch (error) {
  console.error(error);
 }
}
 
