import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

const createData = [
  {
    title: 'test title1',
    year: 2022,
    geners: ['action', 'adventure'],
  },
  {
    title: 'test title2',
    year: 2022,
    geners: ['drama'],
  },
];

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);

    service.create(createData[0]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('/movies', () => {
    it('GET all movies', () => {
      const movies = controller.getAll();
      expect(movies).toBeInstanceOf(Array);
    });
    it('POST a movie', () => {
      const beforeCreate = controller.getAll().length;
      controller.create(createData[0]);
      const afterCreate = controller.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('/movies/search?', () => {
    it('GET search year', () => {
      const movies = controller.search('2022');
      expect(movies).toBeInstanceOf(Array);
    });
  });

  describe('/movies/:id', () => {
    it('GET a movie', () => {
      const movie = controller.getOne('1');
      expect(movie).toBeDefined();
    });
    it('movie NotFoundException', () => {
      try {
        controller.getOne('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('DELETE a movie', () => {
      const beforeDelete = controller.getAll().length;
      controller.remove('1');
      const afterDelete = controller.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('PATCH a movie', () => {
      controller.patch('1', { title: 'Updated title!!!' });
    });
  });
});
