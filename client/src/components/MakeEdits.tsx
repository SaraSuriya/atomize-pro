import { useState } from "react";
import Delete from "../assets/other/delete-button.png";
import Edit from "../assets/other/edit-button.png";
import { deleteTab, deleteGoal } from "../ApiService.js";
import { useAppContext } from "../AppContext.js";
import { Action, State, Tab } from "../types/types.js";
import { Goal } from "../types/types.js";

export default function MakeEdits() {
  const { state, dispatch } = useAppContext() as {
    state: State;
    dispatch: (action: Action) => void;
  };
  const { tabs, goals } = state;
  // Styling and rendering not fully complete. Will add 'edit' functionalities.

  // States in the form to track selected Tab, List or Goal
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleSelectObject = (type: string, obj: Tab | Goal | string) => {
    setSelectedType(type);

    if (type === "Tab") {
      setSelectedTab(obj as Tab);
      setSelectedList(null); // Reset list selection when tab changes
      setSelectedGoal(null); // Reset goal selection when tab changes
    } else if (type === "List") {
      setSelectedList(obj as string); // Set selected list
      setSelectedGoal(null); // Reset goal selection when list changes
    } else if (type === "Goal") {
      setSelectedGoal(obj as Goal); // Set selected goal
    }
  };

  // Function to delete a Tab and associated goals
  const deleteSelectedTab = () => {
    if (!selectedTab || typeof selectedTab.id !== "number") return;
    dispatch({ type: "SET_LOADING", payload: true });
    // Delete all goals associated with the selected tab
    goals.forEach((goal) => {
      if (goal.tab === selectedTab.id) {
        deleteGoal(goal);
      }
    });

    // Delete the selected tab
    deleteTab(selectedTab.id);
    dispatch({ type: "DELETE_TAB", payload: { id: selectedTab.id } });
    dispatch({ type: "CALCULATE_GOAL_XP" }); // Recalculate XP
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const deleteSelectedGoal = () => {
    if (!selectedGoal) return;

    const holdList = selectedGoal.list_name;
    deleteGoal(selectedGoal);

    // Update global state by dispatching DELETE_GOAL
    dispatch({
      type: "DELETE_GOAL",
      payload: { id: selectedGoal.id as number },
    });

    dispatch({ type: "CALCULATE_GOAL_XP" }); // Recalculate XP

    // Checking if the list is now empty
    const listNotEmpty = goals.some(
      (goal) => goal.list_name === holdList && goal.id !== selectedGoal.id
    );

    if (!listNotEmpty) {
      // If the list is empty, using the reducer to update global state
      dispatch({ type: "DELETE_LIST", payload: { list_name: holdList } });
      dispatch({ type: "CALCULATE_GOAL_XP" }); // Recalculate XP
    }
  };

  // Function to delete a List and associated goals
  const deleteSelectedList = () => {
    if (!selectedList) return;

    // Delete all goals associated with the selected list
    goals.forEach((goal) => {
      if (goal.list_name === selectedList) {
        deleteGoal(goal);
      }
    });

    // const goalForList = goals.find((g) => g.list_name === selectedList);
    // if (goalForList) {
    //   deleteListPosition(goalForList.tab, selectedList);
    // }
  };

  // Centralize reset logic after deletion
  const resetSelections = () => {
    setSelectedTab(null);
    setSelectedList(null);
    setSelectedGoal(null);
    setSelectedType("");
  };

  // Unified delete handler that delegates to the correct delete function
  const handleDelete = () => {
    if (!selectedType || (!selectedTab && !selectedList && !selectedGoal))
      return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${
        selectedTab?.name || selectedList || selectedGoal?.task_name
      }"?`
    );

    if (confirmDelete) {
      if (selectedType === "Tab") {
        deleteSelectedTab();
      } else if (selectedType === "Goal") {
        deleteSelectedGoal();
      } else if (selectedType === "List") {
        deleteSelectedList();
      }

      // Reset selections after deletion
      resetSelections();
    }
  };

  // Filter lists based on the selected tab
  const uniqueLists = selectedTab
    ? Array.from(
        new Set(
          goals
            .filter((goal) => goal.tab === selectedTab.id)
            .map((goal) => goal.list_name)
        )
      )
    : [];

  return (
    <div className="edit-container flex flex-col w-[900px] h-[400px] m-[40px] px-[30px] py-[50px] text-center justify-center rounded-[45px] text-sm text-[orange]">
      <div className="flex flex-row justify-between m-[20px]">
        <div className="w-[260px] h-[280px] text-center rounded-[10px] text-[white] border overflow-auto border-solid border-[#E8FF79]">
          <div className="all-tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={`flex flex-row justify-center cursor-pointer pl-[18px] pr-[25px] py-[18px] hover:bg-[#90eebd] hover:text-[#533dc9] ${
                  tab === selectedTab ? "bg-[#90eebd] text-[#533dc9]" : ""
                }`}
                onClick={() => handleSelectObject("Tab", tab)}
              >
                <img
                  src={`/icons/${tab.icon_name}`}
                  className="w-5 mr-2.5"
                  alt={tab.name}
                />
                <span className="text-base">{tab.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Lists */}
        <div className="all-stored-items-box">
          {uniqueLists.map((list) => (
            <div
              key={list}
              className={`flex flex-row justify-center cursor-pointer pl-[18px] pr-[25px] py-[18px] hover:bg-[#90eebd] hover:text-[#533dc9] ${
                list === selectedList ? "bg-[#90eebd] text-[#533dc9]" : ""
              }`}
              onClick={() => handleSelectObject("List", list)}
            >
              <span className="text-base">{list}</span>
            </div>
          ))}
        </div>

        {/* Column 3: Goals */}
        <div className="all-stored-items-box">
          {goals
            .filter((goal) => goal.list_name === selectedList)
            .map((goal) => (
              <div
                key={goal.id}
                className={`flex flex-row justify-center cursor-pointer pl-[18px] pr-[25px] py-[18px] hover:bg-[#90eebd] hover:text-[#533dc9] ${
                  goal === selectedGoal ? "bg-[#90eebd] text-[#533dc9]" : ""
                }`}
                onClick={() => handleSelectObject("Goal", goal)}
              >
                <span className="text-base">{goal.task_name}</span>
              </div>
            ))}
        </div>
      </div>
      {/* Edit Options */}
      <div className="flex flex-row justify-around">
        <div className="selected-obj-info">
          <span className="text-[rgb(255,207,119)]">
            SELECTED: {selectedList ? selectedList : ""}
          </span>
        </div>
        <div className="edit-buttons">
          <button className="w-[60px] text-[11px] mx-[5px] my-0 p-2">
            <img src={Edit} className="h-10 mb-[5px]" alt="Edit" />
            EDIT
          </button>
          <button className="w-[60px] text-[11px] mx-[5px] my-0 p-2" onClick={handleDelete}>
            <img src={Delete} className="h-10 mb-[5px]" alt="Delete" />
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
