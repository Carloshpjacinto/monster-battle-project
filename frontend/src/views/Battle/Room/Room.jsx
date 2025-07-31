import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BattleService } from "../../../api/Battle/service/Battle.service";
import "./index.scss";
import { socket } from "../../../api/WebSocket/conection.websocket";

const RoomBattle = () => {
  const { id } = useParams();
  const [battle, setBattle] = useState(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [botHP, setBotHP] = useState(100);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [startBattle, setStartBattle] = useState(true);
  const [actionLog, setActionLog] = useState([]);

  useEffect(() => {
    const loadBattle = async () => {
      const { data } = await BattleService.getBattleById(id);
      setBattle(data);
      setPlayerHP(data.monster_player1.hp);
      setBotHP(data.monster_player2.hp);
    };

    if (id) {
      loadBattle();
    }

    socket.on("update-hp", ({ playerHP, botHP }) => {
      if (playerHP !== undefined) setPlayerHP(playerHP);
      if (botHP !== undefined) setBotHP(botHP);
    });

    socket.on("log", (msg) => {
      setActionLog((prev) => [msg, ...prev]);
    });

    return () => {
      socket.off("update-hp");
      socket.off("log");
    };
  }, [id]);

  const handleAttack = () => {
    if (playerTurn) {
      socket.emit("player-attack");
      setPlayerTurn(false);
    }
  };

  const handleStart = () => {
    if (id) {
      socket.emit("start", Number(id));

      setStartBattle(false);
    }
  };

  socket.on("your-turn", () => {
    setPlayerTurn(true);
  });

  return (
    <div className="battle-arena">
      <div className="monsters-display">
        <div className="monster-card player">
          <h3>
            {battle?.monster_player1.name} ({battle?.player1.name})
          </h3>
          <div className="hp-bar">
            <div style={{ width: `${playerHP}%` }} className="hp-fill" />
          </div>
          <p>HP: {playerHP}</p>
        </div>

        <div className="vs-text">VS</div>

        <div className="monster-card bot">
          <h3>
            {battle?.monster_player2.name} ({battle?.player2.name})
          </h3>
          <div className="hp-bar">
            <div style={{ width: `${botHP}%` }} className="hp-fill enemy" />
          </div>
          <p>HP: {botHP}</p>
        </div>
      </div>

      {startBattle && (
        <div className="battle-actions">
          <button onClick={handleStart} disabled={!startBattle}>
            iniciar
          </button>
        </div>
      )}

      {!startBattle && (
        <div className="battle-actions">
          <button onClick={handleAttack} disabled={!playerTurn}>
            Atacar
          </button>
        </div>
      )}

      <div className="log-box">
        <h4>Registro da Batalha</h4>
        <ul>
          {actionLog.map((entry, index) => {
            const isBotLog = entry.toLowerCase().includes("adversário");
            return (
              <li key={index} className={isBotLog ? "log-bot" : ""}>
                {entry}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RoomBattle;
