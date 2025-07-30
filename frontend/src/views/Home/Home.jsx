import SelectBot from "../../components/SelectBot/SelectBot";
import SelectPlayer from "../../components/SelectPlayer/SelectPlayer";
import "./index.scss";

const Home = () => {
  return (
    <>
      <div className="home">
        <div>
          <SelectPlayer />
        </div>
        <div className="mid-layout-home">
          <h1>Battle of Monsters</h1>
          <div className="divider"></div>
        </div>

        <div>
          <SelectBot />
        </div>
      </div>
    </>
  );
};

export default Home;
