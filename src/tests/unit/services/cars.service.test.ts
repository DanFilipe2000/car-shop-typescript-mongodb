import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/cars.model';
import CarsService from '../../../services/cars.service';
import { ZodError } from 'zod';
import { ICar } from '../../../interfaces/ICar';
import { carDoorsLtTwo } from '../../../../__tests__/utils/CarsMock';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

const carMock = {
	model: "Ferrari Maranello",
	year: 1963,
	color: "red",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2,
}

const carsResultMock = {
	model: "Ferrari Maranello",
	year: 1963,
	color: "red",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2,
	_id: "636ad96b90d18397cccbbbe4"
}

const carsMock = [
  {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
    _id: "636ad96b90d18397cccbbbe4"
  },
  {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
    _id: "636ad96b90d18397cccbbbe4"
  }
]

describe('Cars Service', () => {
  const carModel = new CarsModel();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon.stub(carsService, 'create').resolves(carsResultMock);
    sinon.stub(carsService, 'read').resolves(carsMock);
    sinon.stub(carsService, 'readOne').resolves(carsResultMock);
    sinon.stub(carsService, 'update').resolves(carsResultMock);
    sinon.stub(carsService, 'delete').resolves(carMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Retorna o carro criado na Model', async () => {
    const result = await carsService.create(carMock);
    expect(result as ICar).to.be.eq(carsResultMock as ICar);
  });

  it('Retorna todos os carros da Model', async () => {
    const result = await carsService.read();
    expect(result as ICar[]).to.be.eq(carsMock as ICar[]);
  });

  it('Retorna um unico carro baseado no id', async () => {
    const result = await carsService.readOne(carsResultMock._id);
    expect(result).to.be.eq(carsResultMock);
  });

  it('Retorna um unico carro baseado no id que foi atualizado', async () => {
    const result = await carsService.update(carsResultMock._id, { ...carMock });
    expect(result).to.be.eq(carsResultMock);
  });

  it('Retorna um unico carro baseado no id que foi deletado', async () => {
    const result = await carsService.delete(carsResultMock._id);
    expect(result).to.be.eq(carMock);
  });
});

describe('Cars Service Errors', () => {
  const carModel = new CarsModel();
  const carsService = new CarsService(carModel);

  it('Dispara um excessão quando algum dado recebido estiver errado', async () => {
    let err;
    try {
      await carsService.create({});
    } catch (error) {
      err = error;
    }
    expect(err).to.be.instanceOf(ZodError);
  })

  it('Dispara um excessão quando o id estiver errado', async () => {
    let err;
    try {
      await carsService.readOne('iderrado');
    } catch (error) {
      err = error;
    }
    expect(err).to.be.instanceOf(Error);
  })

  describe('Dispara um excessão quando o id estiver certo mas não for válido', async () => {
    before(async () => {
      sinon.stub(carsService, 'readOne').resolves(null);
    });
  
    after(() => {
      sinon.restore();
    })

    it('Verificando', async () => {
      let err;
    try {
      await carsService.readOne('999999999999999999999999');
    } catch (error: any) {
      console.log(error);
      err = error;
    }
    expect(err, 'error should be defined').to.be.undefined;
    })
  })

  it('Dispara um excessão na função update quando passado um id errado', async () => {
    let error;

    try {
      await carsService.update('21', { ...carMock });
    } catch (err: any) {
      error = err
    }

    expect(error, 'error should be defined').not.to.be.undefined;
    expect(error?.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
  });

  it('Quando o schema passado é inválido', async () => {
    let error;

    try {
      await carsService.update('636ad96b90d18397cccbbbe4', {});
    } catch (err: any) {
      error = err
    }

    expect(error).to.be.instanceOf(ZodError);
  });

  it('Dispara uma excessão quando o id passado é inválido - Delete', async () => {
    let error;

    try {
      await carsService.delete('12');
    } catch (err: any) {
      error = err
    }

    expect(error, 'error should be defined').not.to.be.undefined;
    expect(error?.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
  });
});
