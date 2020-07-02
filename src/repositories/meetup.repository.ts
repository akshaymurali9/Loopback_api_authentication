import {DefaultCrudRepository} from '@loopback/repository';
import {Meetup, MeetupRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MeetupRepository extends DefaultCrudRepository<
  Meetup,
  typeof Meetup.prototype.id,
  MeetupRelations
> {
  constructor(
    @inject('datasources.db') dataSource: MongoDsDataSource,
  ) {
    super(Meetup, dataSource);
  }
}
