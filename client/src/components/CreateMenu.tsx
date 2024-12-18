import { Link } from "react-router-dom";
import "../styles/CreateNew.css";
import Goal from "../assets/other/goal.png";
import List from "../assets/other/list.png";
import Plan from "../assets/other/plan.png";
import Tab from "../assets/other/tab.png";

export default function CreateNew() {
  return (
    <div className="create-container w-[700px] h-[310px] m-[40px] p-[30px] text-center justify-center rounded-[45px] text-[#f1a817]">
      <p id="create-question">CREATE A NEW...</p>
      <div className="createChoices">
        <Link to="/create-new/goal">
          <div className="choice">
            <div className="choice-text">GOAL</div>
            <img src={Goal} alt="goal" className="choice-image" />
          </div>
        </Link>
        <Link to="/create-new/list">
          <div className="choice">
            <div className="choice-text">LIST</div>
            <img src={List} alt="list" className="choice-image" />
          </div>
        </Link>
        <Link to="/create-new/tab">
          <div className="choice">
            <div className="choice-text">TAB</div>
            <img src={Tab} alt="tab" className="choice-image" />
          </div>
        </Link>
        <Link to="/create-new/plan">
          <div className="choice">
            <div className="choice-text">PLAN</div>
            <img src={Plan} alt="plan" className="choice-image" />
          </div>
        </Link>
      </div>
    </div>
  );
}
