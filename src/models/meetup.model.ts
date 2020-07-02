import {Entity, model, property} from '@loopback/repository';

@model()
export class Meetup extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;


  constructor(data?: Partial<Meetup>) {
    super(data);
  }
}

export interface MeetupRelations {
  // describe navigational properties here
}

export type MeetupWithRelations = Meetup & MeetupRelations;
