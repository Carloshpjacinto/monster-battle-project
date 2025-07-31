import "./index.scss";
import { MonsterService } from "../../api/Monster/service/Monster.service";
import { useEffect, useState } from "react";

function SelectBot({
  handleSelectMonsterBot,
  handleRandomSelect,
  selectedMonsterBot,
  createInfoBattle,
}) {
  async function getMonster() {
    const { data } = await MonsterService.getMonster();
    setMonsters(data);
  }

  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    getMonster();
  }, []);
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
            onChange={handleSelectMonsterBot}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione...
            </option>
            {monsters.map((monster) => (
              <option value={monster.id}>{monster.name}</option>
            ))}
          </select>
        </div>
        <div className="position-button">
          <button
            type="button"
            className="prepareBattle"
            name="nickNameUser"
            onClick={createInfoBattle}
          >
            Prepare Battle
          </button>
        </div>
      </form>

      {selectedMonsterBot && (
        <div>
          <h2>Monster info</h2>
          <form className="form-monster">
            <h3>{selectedMonsterBot.name}</h3>
            <p>HP: {selectedMonsterBot.hp}</p>
            <p>Attack: {selectedMonsterBot.attack}</p>
            <p>Defesa: {selectedMonsterBot.defend}</p>
            <p>Velocidade: {selectedMonsterBot.speed}</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default SelectBot;
