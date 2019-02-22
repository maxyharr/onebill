import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, RemoteMongoDatabase, StitchAppClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class StitchService {
  stitchClient: StitchAppClient
  mongoClient: RemoteMongoClient
  currentUser: User

  _database: RemoteMongoDatabase

  get mongoStitchId(): string {
    return 'onebill-myolp'
  }

  database(): Promise<RemoteMongoDatabase> {
    return new Promise(res => {
      if (this._database) {
        res(this._database)
      } else {
        this._connect().then(() => {
          res(this._database)
        })
      }
    })
  }

  // Session related stuff
  loggedIn() {
    return !!this.currentUser
  }

  loggedOut() {
    return !this.loggedIn()
  }

  // TODO: handle non-anonymous authentication
  logIn(): Promise<any> {
    return new Promise(resolve => {
      this.stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
        this.currentUser = user
        resolve()
      })
    })
  }

  _connect(): Promise<any> {
    return new Promise(res => {
      this.stitchClient = Stitch.initializeDefaultAppClient(this.mongoStitchId)

      if (this.loggedOut) {
        this.logIn().then(() => {
          this._initializeDatabase()
          res()
        })
      } else {
        this._initializeDatabase()
        res()
      }
    })
  }

  // Private methods
  _initializeDatabase() {
    this.mongoClient = this.stitchClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
    this._database = this.mongoClient.db(environment.db)
  }
}

export interface User {
  id: string
}