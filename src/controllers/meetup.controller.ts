import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Meetup} from '../models';
import {MeetupRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt') // <---- Apply the @authenticate decorator at the class level
export class MeetupController {
  constructor(
    @repository(MeetupRepository)
    public meetupRepository : MeetupRepository,
  ) {}

  @post('/meetups', {
    responses: {
      '200': {
        description: 'Meetup model instance',
        content: {'application/json': {schema: getModelSchemaRef(Meetup)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetup, {
            title: 'NewMeetup',
            
          }),
        },
      },
    })
    meetup: Meetup,
  ): Promise<Meetup> {
    return this.meetupRepository.create(meetup);
  }

  @get('/meetups/count', {
    responses: {
      '200': {
        description: 'Meetup model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Meetup) where?: Where<Meetup>,
  ): Promise<Count> {
    return this.meetupRepository.count(where);
  }

  @get('/meetups', {
    responses: {
      '200': {
        description: 'Array of Meetup model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Meetup, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Meetup) filter?: Filter<Meetup>,
  ): Promise<Meetup[]> {
    return this.meetupRepository.find(filter);
  }

  @patch('/meetups', {
    responses: {
      '200': {
        description: 'Meetup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetup, {partial: true}),
        },
      },
    })
    meetup: Meetup,
    @param.where(Meetup) where?: Where<Meetup>,
  ): Promise<Count> {
    return this.meetupRepository.updateAll(meetup, where);
  }

  @get('/meetups/{id}', {
    responses: {
      '200': {
        description: 'Meetup model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Meetup, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Meetup, {exclude: 'where'}) filter?: FilterExcludingWhere<Meetup>
  ): Promise<Meetup> {
    return this.meetupRepository.findById(id, filter);
  }

  @patch('/meetups/{id}', {
    responses: {
      '204': {
        description: 'Meetup PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meetup, {partial: true}),
        },
      },
    })
    meetup: Meetup,
  ): Promise<void> {
    await this.meetupRepository.updateById(id, meetup);
  }

  @put('/meetups/{id}', {
    responses: {
      '204': {
        description: 'Meetup PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() meetup: Meetup,
  ): Promise<void> {
    await this.meetupRepository.replaceById(id, meetup);
  }

  @del('/meetups/{id}', {
    responses: {
      '204': {
        description: 'Meetup DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.meetupRepository.deleteById(id);
  }
}
