import "./index.scss";
import { useEffect, useState } from "react";
import { MonsterService } from "../../api/Monster/service/Monster.service";
import { ArenaService } from "../../api/Arena/service/Arena.service";

function SelectPlayer({
  handleSelectNamePlayer,
  handleSelectMonsterPlayer,
  handleSelectArena,
  selectedMonsterPlayer,
}) {
  async function getMonster() {
    const { data } = await MonsterService.getMonster();
    setMonsters(data);
  }

  const [monsters, setMonsters] = useState([]);

  async function getArenas() {
    const { data } = await ArenaService.getArenas();
    setArenas(data);
  }

  const [arenas, setArenas] = useState([]);

  useEffect(() => {
    getMonster();

    getArenas();
  }, []);
  return (
    <div className="painel-cadastro">
      <h2>Player</h2>
      <form className="form-player">
        <input
          className="nickname"
          type="text"
          placeholder="Nickname"
          name="nickNameUser"
          onChange={handleSelectNamePlayer}
        />
        <div>
          <label>Select Monster</label>
          <select
            className="selectMonster"
            name="selectMonster"
            onChange={handleSelectMonsterPlayer}
            defaultValue=""
          >
            <option value="" disabled>Selecione...</option>
            {monsters.map((monster) => (
              <option value={monster.id}>{monster.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Arena</label>
          <select
            className="selectArena"
            name="selectArena"
            onChange={handleSelectArena}
            defaultValue=""
          >
            <option value="" disabled>Selecione...</option>
            {arenas.map((arena) => (
              <option value={arena.id}>{arena.name}</option>
            ))}
          </select>
        </div>
      </form>

      {selectedMonsterPlayer && (
        <div>
          <h2>Monster info</h2>
          <form className="form-monster">
            <h3>{selectedMonsterPlayer.name}</h3>
            <p>HP: {selectedMonsterPlayer.hp}</p>
            <p>Attack: {selectedMonsterPlayer.attack}</p>
            <p>Defesa: {selectedMonsterPlayer.defend}</p>
            <p>Velocidade: {selectedMonsterPlayer.speed}</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default SelectPlayer;
