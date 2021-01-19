import apiMarvel from '../services/apiMarvel';

const hashKey =
  '?apikey=07f05d67192c439bf8203269fc153fdd&hash=a2110823d4049282bfbe666bd8e79fff&ts=1609890812920';

class CharController {
  async index(request, response) {
    try {
      const { offset } = request.params;
      const result = await apiMarvel.get(`/characters${hashKey}`, {
        params: { limit: 100, offset: `${offset}` },
      });

      return response.json(result.data.data);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { name } = request.params;
      const result = await apiMarvel.get(`/characters${hashKey}`, {
        params: { limit: 100, nameStartsWith: `${name}` },
      });
      return response.json(result.data.data);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}

export default new CharController();
