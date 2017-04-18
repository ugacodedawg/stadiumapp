const connectionString:string = 'mongodb://webuser:Secret123!@ds147599.mlab.com:47599/cctrav';
import * as mongodb from 'mongodb';

export default class Database {
  public static db:mongodb.Db;

  public static connect() {
    return mongodb.MongoClient.connect(connectionString).then((db) => {
        this.db = db;
    }).catch((err) => {
        console.error(err);
    });
  }
}
