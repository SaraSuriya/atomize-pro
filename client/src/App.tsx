import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./store/reducer.js";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js";
import CreateNew from "./components/CreateMenu.js";
import CreateNewList from "./components/CreateNewList.js";
import CreateNewTab from "./components/CreateNewTab.js";
import CreateNewGoal from "./components/CreateNewGoal.js";
import MakeEdits from "./components/MakeEdits.js";
import HomePage from "./components/HomePage.js";
import Tab from "./components/Tab.js";
import { fetchAllTabs, fetchAllGoals } from "./ApiService.js";
import "./App.css";
import { AppContext } from "./AppContext.js";
import Loader from "./components/ui/Loader.js";
import HomePlanner from "./components/HomePage-Planner.js";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goals, tabs, isLoading } = state;

  const loadData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Fetch tabs and goals simultaneously
      const [tabsData, fetchedGoals] = await Promise.all([
        fetchAllTabs(),
        fetchAllGoals(),
      ]);

      console.log("Fetched tabs:", tabsData);
      console.log("Fetched goals:", fetchedGoals);

      // Dispatch tabs data
      console.log("Dispatching tabs data:", tabsData);
      dispatch({ type: "SET_TABS", payload: tabsData });

      // Process and dispatch goals data
      if (
        fetchedGoals &&
        Array.isArray(fetchedGoals.simpleLists) &&
        Array.isArray(fetchedGoals.progressBars) &&
        Array.isArray(fetchedGoals.levels) &&
        Array.isArray(fetchedGoals.sets)
      ) {
        const allGoals = [
          ...fetchedGoals.simpleLists,
          ...fetchedGoals.progressBars,
          ...fetchedGoals.levels,
          ...fetchedGoals.sets,
        ];
        console.log("Dispatching all goals:", allGoals);
        dispatch({ type: "SET_GOALS", payload: allGoals });

        // Now dispatch CALCULATE_GOAL_XP with the updated goals array
        dispatch({ type: "CALCULATE_GOAL_XP", payload: allGoals });
      } else {
        dispatch({ type: "SET_GOALS", payload: [] });
      }
    } catch (error) {
      console.error("There was an error loading data:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Fetches tabs and goals once on app mount.
  useEffect(() => {
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="wrapper">
        <NavBar />
        {/* Display Loader when isLoading is true */}
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/home/*" element={<HomePage />} />
            <Route path="/create-new/plan" element={<HomePlanner />} />
            <Route path="/create-new" element={<CreateNew />} />
            <Route path="/create-new/list" element={<CreateNewList />} />
            <Route path="/create-new/tab" element={<CreateNewTab />} />
            <Route
              path="/create-new/goal"
              element={<CreateNewGoal tabs={tabs} />}
            />
            <Route path="/edit" element={<MakeEdits />} />
            {!isLoading &&
              tabs.length > 0 &&
              tabs.map((tab) => {
                if (tab.name) {
                  return (
                    <Route
                      key={tab.name}
                      path={`/:tabName`}
                      element={<Tab />}
                    />
                  );
                }
              })}
          </Routes>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
