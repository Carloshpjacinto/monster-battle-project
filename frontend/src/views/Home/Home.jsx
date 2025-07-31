import { useEffect, useState } from "react";
import SelectBot from "../../components/SelectBot/SelectBot";
import SelectPlayer from "../../components/SelectPlayer/SelectPlayer";
import "./index.scss";
import { PlayerService } from "../../api/Player/service/Player.service";
import { BattleService } from "../../api/Battle/service/Battle.service";
import { MonsterService } from "../../api/Monster/service/Monster.service";
import { ArenaService } from "../../api/Arena/service/Arena.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  async function createPlayer(nickname) {
    const body = {
      name: nickname,
    };

    return await PlayerService.createPlayer(body);
  }
  async function createBattle(idPlayer, body) {
    return await BattleService.createBattle(idPlayer, body);
  }

  async function getMonster() {
    const { data } = await MonsterService.getMonster();
    setMonsters(data);
  }

  const navigate = useNavigate();

  const [monsters, setMonsters] = useState([]);

  const [selectedNicknamePlayer, setSelectedNicknamePlayer] = useState();

  const [selectedMonsterPlayer, setSelectedMonsterPlayer] = useState();

  const [selectedArena, setSelectedArena] = useState();

  const [selectedMonsterBot, setSelectedMonsterBot] = useState();

  const handleSelectNamePlayer = (e) => {
    const nicknamePlayer = e.target.value;

    setSelectedNicknamePlayer(nicknamePlayer);
  };

  const handleSelectMonsterPlayer = async (e) => {
    const monsterId = Number(e.target.value);
    const monster = await MonsterService.getMonsterId(monsterId);

    setSelectedMonsterPlayer(monster.data);
  };

  const handleSelectArena = async (e) => {
    const idArena = Number(e.target.value);
    const arena = await ArenaService.getByIdArena(idArena);
    setSelectedArena(arena.data);
  };

  const handleSelectMonsterBot = async (e) => {
    const monsterId = Number(e.target.value);
    const monster = await MonsterService.getMonsterId(monsterId);
    setSelectedMonsterBot(monster.data);
  };

  const handleRandomSelect = async () => {
    const randomId = Math.floor(Math.random() * monsters.length);
    const monster = await MonsterService.getMonsterId(randomId);
    setSelectedMonsterBot(monster.data);
  };

  const createInfoBattle = async () => {
    const userId = await createPlayer(selectedNicknamePlayer);

    const bodyBattle = {
      id_monsterPlayer: selectedMonsterPlayer.id,
      id_arena: selectedArena.id,
      id_monsterBot: selectedMonsterBot.id,
    };

    const battle = await createBattle(userId, bodyBattle);

    navigate(`/prepare/battle/${battle.data.id}`);
  };

  useEffect(() => {
    getMonster();
  }, []);

  return (
    <>
      <div className="home">
        <div>
          <SelectPlayer
            handleSelectNamePlayer={handleSelectNamePlayer}
            handleSelectMonsterPlayer={handleSelectMonsterPlayer}
            handleSelectArena={handleSelectArena}
            selectedMonsterPlayer={selectedMonsterPlayer}
          />
        </div>
        <div className="mid-layout-home">
          <h1>Battle of Monsters</h1>
          <div className="divider"></div>
        </div>

        <div>
          <SelectBot
            handleSelectMonsterBot={handleSelectMonsterBot}
            handleRandomSelect={handleRandomSelect}
            selectedMonsterBot={selectedMonsterBot}
            createInfoBattle={createInfoBattle}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
