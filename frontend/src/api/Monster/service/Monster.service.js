import axios from "axios";

const BASE_URL = "http://localhost:3000";

export class MonsterService {
  static getMonster() {
    return axios.get(BASE_URL + "/monster");
  }

  static getMonsterId(idMonster) {
    return axios.get(`${BASE_URL}/monster/${idMonster}`);
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
