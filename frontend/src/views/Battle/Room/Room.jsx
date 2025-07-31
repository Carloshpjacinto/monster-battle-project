import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BattleService } from "../../../api/Battle/service/Battle.service";
import "./index.scss";
import { socket } from "../../../api/WebSocket/Connection.websocket";
import { useNavigate } from "react-router-dom";

const RoomBattle = () => {
  const { id } = useParams();
  const [battle, setBattle] = useState(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [botHP, setBotHP] = useState(100);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [startBattle, setStartBattle] = useState(true);
  const [actionLog, setActionLog] = useState([]);
  const [cooldown, setCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasForfeited, setHasForfeited] = useState(false);

  const navigate = useNavigate();

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
      if (playerHP == 0 || botHP == 0) {
        setHasForfeited(true);
      }
    });

    socket.on("log", (msg) => {
      setActionLog((prev) => [msg, ...prev]);
    });

    return () => {
      socket.off("update-hp");
      socket.off("log");
    };
  }, [id]);

  const handleStart = () => {
    if (id) {
      socket.emit("start", Number(id));

      setIsLoading(true);

      setTimeout(() => {
        setStartBattle(false);
      }, 3000);
    }
  };

  const handleAttack = () => {
    if (playerTurn) {
      socket.emit("player-attack");
      setPlayerTurn(false);
    }
  };

  const handleDefend = () => {
    if (playerTurn) {
      socket.emit("player-defend");
      setPlayerTurn(false);
    }
  };

  const handleAttackSpecial = () => {
    if (playerTurn) {
      socket.emit("player-attack-special");
      setPlayerTurn(false);

      setCooldown(4);
    }
  };

  const handleForfeit = () => {
    socket.emit("forfeit");
    setPlayerTurn(false);
    setHasForfeited(true);
  };

  socket.on("your-turn", () => {
    let calculoCooldown;

    setPlayerTurn(true);

    if (cooldown > 0) {
      calculoCooldown = cooldown - 1;

      setCooldown(calculoCooldown);
    }
  });

  const goHome = () => {
    navigate("/");
  };

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
          <p>HP: {playerHP || 0}</p>
          <p>Attack: {battle?.monster_player1.attack || "Carregando..."}</p>
          <p>Defesa: {battle?.monster_player1.defend || "Carregando..."}</p>
          <p>Velocidade: {battle?.monster_player1.speed || "Carregando..."}</p>
        </div>

        <div className="vs-text">VS</div>

        <div className="monster-card bot">
          <h3>
            {battle?.monster_player2.name} ({battle?.player2.name})
          </h3>
          <div className="hp-bar">
            <div style={{ width: `${botHP}%` }} className="hp-fill enemy" />
          </div>
          <p>HP: {botHP || 0}</p>
          <p>Attack: {battle?.monster_player2.attack || "Carregando..."}</p>
          <p>Defesa: {battle?.monster_player2.defend || "Carregando..."}</p>
          <p>Velocidade: {battle?.monster_player2.speed || "Carregando..."}</p>
        </div>
      </div>

      {startBattle && (
        <div className="battle-actions">
          <button onClick={handleStart} disabled={!startBattle || isLoading}>
            {isLoading ? "Carregando..." : "Iniciar"}
          </button>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {!startBattle && (
          <>
            <div className="battle-actions">
              <button onClick={handleAttack} disabled={!playerTurn}>
                Atacar
              </button>
            </div>

            <div className="battle-actions">
              <button onClick={handleDefend} disabled={!playerTurn}>
                Defender
              </button>
            </div>
            <div className="battle-actions">
              <button
                onClick={handleAttackSpecial}
                disabled={cooldown > 0 || !playerTurn}
              >
                Especial
              </button>
            </div>
            <div className="battle-actions">
              {!hasForfeited ? (
                <button onClick={handleForfeit} disabled={!playerTurn}>
                  Desistir
                </button>
              ) : (
                <button onClick={goHome}>Voltar à Página Inicial</button>
              )}
            </div>
          </>
        )}
      </div>
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
