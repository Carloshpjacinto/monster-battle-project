import { useEffect, useState } from "react";
import { BattleService } from "../../../api/Battle/service/Battle.service";
import "./index.scss";
import { Link, useParams } from "react-router-dom";
import { socket } from "../../../api/WebSocket/Connection.websocket";

const PrepareBattle = () => {
  const { id } = useParams();
  const [battle, setBattle] = useState();

  useEffect(() => {
    socket.emit("connection");
    async function getBattleById(idBattle) {
      try {
        const { data } = await BattleService.getBattleById(idBattle);
        setBattle(data);
      } catch (error) {
        console.error("Erro ao buscar batalha:", error);
      }
    }

    if (id) getBattleById(id);
  }, [id]);

  return (
    <>
      <div className="PrepareBattle">
        <div>
          <h2>{battle?.player1.name || "Carregando..."}</h2>
          <form className="form-info-monster">
            <h3>{battle?.monster_player1.name || "Carregando..."}</h3>
            <p>HP: {battle?.monster_player1.hp || "Carregando..."}</p>
            <p>Attack: {battle?.monster_player1.attack || "Carregando..."}</p>
            <p>Defesa: {battle?.monster_player1.defend || "Carregando..."}</p>
            <p>
              Velocidade: {battle?.monster_player1.speed || "Carregando..."}
            </p>
          </form>
        </div>

        <Link className="link" to={`/battle/room/${id}`}>
          <button className="button-start-battle">START</button>
        </Link>

        <div>
          <h2>{battle?.player2.name || "Carregando..."}</h2>
          <form className="form-info-monster">
            <h3>{battle?.monster_player2.name || "Carregando..."}</h3>
            <p>HP: {battle?.monster_player2.hp || "Carregando..."}</p>
            <p>Attack: {battle?.monster_player2.attack || "Carregando..."}</p>
            <p>Defesa: {battle?.monster_player2.defend || "Carregando..."}</p>
            <p>
              Velocidade: {battle?.monster_player2.speed || "Carregando..."}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default PrepareBattle;
