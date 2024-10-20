import { Link } from "react-router-dom";
import HomeButton from "../assets/navigation/home-button.png";
import CreateButton from "../assets/navigation/createnew-button.png";
import EditButton from "../assets/navigation/edit-button.png";
import "../styles/ProgressBar.css";
import { useAppContext } from "../AppContext";
import { State } from "../types/types";

export default function NavBar() {
  // const [hoveredText, setHoveredText] = ('');
  const { state } = useAppContext() as {
    state: State;
  };
  const { tabs, goalXPBar, currentXP } = state;
  console.log("NavBar state:", state);

  const formatDate = (date: Date) => {
    const dateFormat = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const parts = dateFormat.split(" ");
    const dayOfWeek = parts[0];
    const restOfDate = parts.slice(1).join(" ");
    return `${dayOfWeek}, ${restOfDate}`;
  };

  const formattedDate = formatDate(new Date());

  return (
    <>
      <div className="nav-container z-8 py-[15px] px-[24px] mb-10">
        <div className="mr-[25px]">
          <Link to="/home">
            <img src={HomeButton} className="text-3xl h-[33px] cursor-pointer mx-5 hover:scale-[1.2]" />
          </Link>
        </div>
        <div className="border-l-[#E8FF79] border-l border-solid mx-[28px] flex flex-row justify-center">
          {tabs.length > 0 &&
            tabs.map((tab) => {
              if (tab.name) {
                const hyphenatedName = tab.name.replace(/\s+/g, "-");
                return (
                  <Link to={`/${hyphenatedName}`} key={tab.name}>
                    <img src={`/icons/${tab.icon_name}`} className="text-3xl h-[33px] cursor-pointer mx-6 hover:scale-[1.2]" />
                  </Link>
                );
              }
              return null;
            })}
        </div>
        <div className="h-[100%] border-x-[#E8FF79] border-l border-solid w-[20%] flex flex-row justify-center">
          <Link to="/create-new">
            <img src={CreateButton} alt="Create New" className="text-3xl h-[33px] cursor-pointer mx-4 hover:scale-[1.2]" />
          </Link>
          <Link to="/edit">
            <img src={EditButton} alt="Edit" className="text-3xl h-[33px] cursor-pointer mx-4 hover:scale-[1.2]" />
          </Link>
        </div>
        <div className="flex text-center text-[white] text-[15px] w-[480px] pl-[40px] h-[33px] uppercase items-center border-l border-solid">{formattedDate}</div>
        <div className="barBox ml-[30px] -my-2.5">
          <div className="progress-container h-7 w-[350px] ml-[30px] -my-2.5">
            <div
              className="progress-bar xpbar-fill"
              role="progressbar"
              style={{ width: `${(currentXP / (goalXPBar || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
