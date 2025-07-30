import { useState } from "react";
import "./index.scss";
import { monstersInfo } from "../../helpers/listMonsters";

function SelectBot() {
  const [selectedMonster, setSelectedMonster] = useState();

  const handleSelectChange = (e) => {
    const selectedId = Number(e.target.value);
    const monster = monstersInfo.find((m) => m.id === selectedId);
    setSelectedMonster(monster);
  };

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * monstersInfo.length);
    const randomMonster = monstersInfo[randomIndex];
    setSelectedMonster(randomMonster);
  };
  return (
    <div className="painel-cadastro">
      <h2>Bot</h2>
      <form className="form-player">
        <button
          onClick={handleRandomSelect}
          type="button"
          className="selectRandom"
          placeholder="Nickname"
          name="nickNameUser"
        >
          Random Battle
        </button>
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
        <div className="position-button">
          <button
            type="button"
            className="startBattle"
            name="nickNameUser"
          >
            Start Battle
          </button>
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

export default SelectBot;
