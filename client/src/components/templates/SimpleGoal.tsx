import "../../styles/SimpleGoal.css";
import { useCallback } from "react";
import { useAppContext } from "../../AppContext";
import { updateGoalProgress } from "../../ApiService";
import { State, Action } from "../../types/types";

interface SimpleGoalProps {
  goalID: number;
}

export default function SimpleGoal({ goalID }: SimpleGoalProps) {
  const { state, dispatch } = useAppContext() as {
    state: State;
    dispatch: (action: Action) => void;
  };

  // Get the goal from the global state using goalID
  const goal = state.goals.find((g) => g.id === goalID);

  // Memoize the completeGoal function to prevent unnecessary re-creation
  const completeGoal = useCallback(() => {
    if (goal && !goal.complete) {
      // Dispatch action to update the global state
      dispatch({
        type: "UPDATE_GOAL",
        payload: { id: goal.id, updates: { complete: true } },
      });

      // Update goal progress on the backend
      updateGoalProgress(goal.name, goal.type, true);
    }
  }, [goal, dispatch]);

  // Return early if the goal is not found
  if (!goal) {
    return <div>Goal not found</div>;
  }

  // Determine goalClass based on goal color
  const goalClass = (() => {
    switch (goal.color) {
      case "red":
        return "simple-red";
      case "purple":
        return "simple-purple";
      default:
        return "simple-orange";
    }
  })();

  return (
    <div className="goal-container">
      <div className="simple-container">
        <div className={`simpleBlock ${goalClass}`} onClick={completeGoal}>
          <div
            className={`statusLight-simple ${
              goal.complete ? "isDone" : "isOff"
            }`}
          ></div>
          <div className="simpleGoalText" onClick={completeGoal}>
            {goal.name}
          </div>
        </div>
      </div>
    </div>
  );
}