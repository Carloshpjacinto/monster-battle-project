import { useState } from "react";
import "./index.scss";
import { monstersInfo } from "../../helpers/listMonsters";
import { arenaInfo } from "../../helpers/listArena";

function SelectPlayer() {
  const [selectedMonster, setSelectedMonster] = useState();

  const handleSelectChange = (e) => {
    const selectedId = Number(e.target.value);
    const monster = monstersInfo.find((m) => m.id === selectedId);
    setSelectedMonster(monster);
  };
  return (
    <div className="painel-cadastro">
      <h2>Player</h2>
      <form className="form-player">
        <input
          className="nickname"
          type="text"
          placeholder="Nickname"
          name="nickNameUser"
        />
        <div>
          <label>Select Monster</label>
          <select
            className="selectMonster"
            name="selectMonster"
            onChange={handleSelectChange}
          >
            {monstersInfo.map((monster) => (
              <option value={monster.id}>{monster.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Arena</label>
          <select className="selectArena" name="selectArena">
            {arenaInfo.map((arena) => (
              <option value={arena.id}>{arena.name}</option>
            ))}
          </select>
        </div>
      </form>

      {selectedMonster && (
        <div>
          <h2>Monster info</h2>
          <form className="form-monster">
            <h3>{selectedMonster.name}</h3>
            <p>HP: {selectedMonster.hp}</p>
            <p>Attack: {selectedMonster.attack}</p>
            <p>Defesa: {selectedMonster.defend}</p>
            <p>Velocidade: {selectedMonster.speed}</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default SelectPlayer;
