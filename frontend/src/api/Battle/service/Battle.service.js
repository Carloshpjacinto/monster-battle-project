import axios from "axios";

const BASE_URL = "http://localhost:3000";

export class BattleService {
  static async createBattle(idPlayer, bodyBattle) {
    const response = await axios.post(`${BASE_URL}/battle/${idPlayer}`, bodyBattle);

    return response
  }

  static async getBattleById(idBattle) {
    return await axios.get(`${BASE_URL}/battle/${idBattle}`);
  }

  static createLivro(body) {
    return axios.post(`${BASE_URL}/livros`, body);
  }

  static updateLivro(id, body) {
    return axios.put(`${BASE_URL}/livros/${id}`, body);
  }

  static deleteLivro(id) {
    return axios.delete(`${BASE_URL}/livros/${id}`);
  }
}
