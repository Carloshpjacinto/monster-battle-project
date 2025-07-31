import axios from "axios";

const BASE_URL = "http://localhost:3000";

export class ArenaService {
  static getArenas() {
    return axios.get(BASE_URL + `/arena`);
  }

  static getByIdArena(id) {
    return axios.get(`${BASE_URL}/arena/${id}`);
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
