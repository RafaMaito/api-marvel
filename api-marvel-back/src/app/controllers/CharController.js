import apiMarvel from '../services/apiMarvel';

const hashKey =
  '?apikey=07f05d67192c439bf8203269fc153fdd&hash=a2110823d4049282bfbe666bd8e79fff&ts=1609890812920';

class CharController {
  async index(request, response) {
    try {
      const { offset } = request.params;
      const result = await apiMarvel.get(
        `/characters${hashKey}&limit=100&offset=${offset}`
      );
      return response.json({
        characters: result.data.data.results,
        total: result.data.data.total,
      });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async show(request, response) {
    try {
      const { name } = request.params;
      const result = await apiMarvel.get(`/characters${hashKey}`, {
        params: { name: `${name}` },
      });
      return response.json(result.data.data.results);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}

export default new CharController();
