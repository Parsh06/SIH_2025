import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  farmerAPI,
  farmAPI,
  activityAPI,
  advisoryAPI,
  reminderAPI,
  handleApiError,
} from "../services/api";

const DataContext = createContext();

// Initial state
const initialState = {
  farmer: null,
  farms: [],
  activities: [],
  advisories: [],
  reminders: [],
  loading: {
    farmer: false,
    farms: false,
    activities: false,
    advisories: false,
    reminders: false,
  },
  error: null,
};

// Action types
const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_FARMER: "SET_FARMER",
  SET_FARMS: "SET_FARMS",
  SET_ACTIVITIES: "SET_ACTIVITIES",
  SET_ADVISORIES: "SET_ADVISORIES",
  SET_REMINDERS: "SET_REMINDERS",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  RESET: "RESET",
};

// Reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };

    case ActionTypes.SET_FARMER:
      return {
        ...state,
        farmer: action.payload,
        error: null,
      };

    case ActionTypes.SET_FARMS:
      return {
        ...state,
        farms: action.payload,
        error: null,
      };

    case ActionTypes.SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        error: null,
      };

    case ActionTypes.SET_ADVISORIES:
      return {
        ...state,
        advisories: action.payload,
        error: null,
      };

    case ActionTypes.SET_REMINDERS:
      return {
        ...state,
        reminders: action.payload,
        error: null,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { user } = useAuth();

  // Action creators
  const setLoading = (key, value) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: { key, value } });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Farmer operations
  const fetchFarmer = async () => {
    if (!user) return;

    setLoading("farmer", true);
    try {
      const farmer = await farmerAPI.getMe();
      dispatch({ type: ActionTypes.SET_FARMER, payload: farmer });
    } catch (error) {
      setError(handleApiError(error, "Failed to fetch farmer profile"));
    } finally {
      setLoading("farmer", false);
    }
  };

  const createFarmer = async (farmerData) => {
    setLoading("farmer", true);
    try {
      const farmer = await farmerAPI.create(farmerData);
      dispatch({ type: ActionTypes.SET_FARMER, payload: farmer });
      return farmer;
    } catch (error) {
      setError(handleApiError(error, "Failed to create farmer profile"));
      throw error;
    } finally {
      setLoading("farmer", false);
    }
  };

  const updateFarmer = async (farmerId, farmerData) => {
    setLoading("farmer", true);
    try {
      const farmer = await farmerAPI.update(farmerId, farmerData);
      dispatch({ type: ActionTypes.SET_FARMER, payload: farmer });
      return farmer;
    } catch (error) {
      setError(handleApiError(error, "Failed to update farmer profile"));
      throw error;
    } finally {
      setLoading("farmer", false);
    }
  };

  // Farm operations
  const fetchFarms = async () => {
    if (!user) return;

    setLoading("farms", true);
    try {
      const farms = await farmAPI.getAll();
      dispatch({ type: ActionTypes.SET_FARMS, payload: farms });
    } catch (error) {
      setError(handleApiError(error, "Failed to fetch farms"));
    } finally {
      setLoading("farms", false);
    }
  };

  const createFarm = async (farmData) => {
    setLoading("farms", true);
    try {
      const farm = await farmAPI.create(farmData);
      await fetchFarms(); // Refresh farms list
      return farm;
    } catch (error) {
      setError(handleApiError(error, "Failed to create farm"));
      throw error;
    } finally {
      setLoading("farms", false);
    }
  };

  const updateFarm = async (farmId, farmData) => {
    setLoading("farms", true);
    try {
      const farm = await farmAPI.update(farmId, farmData);
      await fetchFarms(); // Refresh farms list
      return farm;
    } catch (error) {
      setError(handleApiError(error, "Failed to update farm"));
      throw error;
    } finally {
      setLoading("farms", false);
    }
  };

  const deleteFarm = async (farmId) => {
    setLoading("farms", true);
    try {
      await farmAPI.delete(farmId);
      await fetchFarms(); // Refresh farms list
    } catch (error) {
      setError(handleApiError(error, "Failed to delete farm"));
      throw error;
    } finally {
      setLoading("farms", false);
    }
  };

  // Activity operations
  const fetchActivities = async () => {
    if (!user) return;

    setLoading("activities", true);
    try {
      const activities = await activityAPI.getAll();
      dispatch({ type: ActionTypes.SET_ACTIVITIES, payload: activities });
    } catch (error) {
      setError(handleApiError(error, "Failed to fetch activities"));
    } finally {
      setLoading("activities", false);
    }
  };

  const createActivity = async (activityData) => {
    setLoading("activities", true);
    try {
      const activity = await activityAPI.create(activityData);
      await fetchActivities(); // Refresh activities list
      return activity;
    } catch (error) {
      setError(handleApiError(error, "Failed to create activity"));
      throw error;
    } finally {
      setLoading("activities", false);
    }
  };

  const deleteActivity = async (activityId) => {
    setLoading("activities", true);
    try {
      await activityAPI.delete(activityId);
      await fetchActivities(); // Refresh activities list
    } catch (error) {
      setError(handleApiError(error, "Failed to delete activity"));
      throw error;
    } finally {
      setLoading("activities", false);
    }
  };

  // Advisory operations
  const fetchAdvisories = async () => {
    if (!user) return;

    setLoading("advisories", true);
    try {
      const advisories = await advisoryAPI.getAll();
      dispatch({ type: ActionTypes.SET_ADVISORIES, payload: advisories });
    } catch (error) {
      setError(handleApiError(error, "Failed to fetch advisories"));
    } finally {
      setLoading("advisories", false);
    }
  };

  const createAdvisory = async (advisoryData) => {
    setLoading("advisories", true);
    try {
      const advisory = await advisoryAPI.create(advisoryData);
      await fetchAdvisories(); // Refresh advisories list
      return advisory;
    } catch (error) {
      setError(handleApiError(error, "Failed to create advisory"));
      throw error;
    } finally {
      setLoading("advisories", false);
    }
  };

  // Reminder operations
  const fetchReminders = async () => {
    if (!user) return;

    setLoading("reminders", true);
    try {
      const reminders = await reminderAPI.getAll();
      dispatch({ type: ActionTypes.SET_REMINDERS, payload: reminders });
    } catch (error) {
      setError(handleApiError(error, "Failed to fetch reminders"));
    } finally {
      setLoading("reminders", false);
    }
  };

  const createReminder = async (reminderData) => {
    setLoading("reminders", true);
    try {
      const reminder = await reminderAPI.create(reminderData);
      await fetchReminders(); // Refresh reminders list
      return reminder;
    } catch (error) {
      setError(handleApiError(error, "Failed to create reminder"));
      throw error;
    } finally {
      setLoading("reminders", false);
    }
  };

  const updateReminder = async (reminderId, reminderData) => {
    setLoading("reminders", true);
    try {
      const reminder = await reminderAPI.update(reminderId, reminderData);
      await fetchReminders(); // Refresh reminders list
      return reminder;
    } catch (error) {
      setError(handleApiError(error, "Failed to update reminder"));
      throw error;
    } finally {
      setLoading("reminders", false);
    }
  };

  const deleteReminder = async (reminderId) => {
    setLoading("reminders", true);
    try {
      await reminderAPI.delete(reminderId);
      await fetchReminders(); // Refresh reminders list
    } catch (error) {
      setError(handleApiError(error, "Failed to delete reminder"));
      throw error;
    } finally {
      setLoading("reminders", false);
    }
  };

  // Load all data when user is authenticated
  useEffect(() => {
    if (user) {
      fetchFarmer();
      fetchFarms();
      fetchActivities();
      fetchAdvisories();
      fetchReminders();
    } else {
      dispatch({ type: ActionTypes.RESET });
    }
  }, [user]);

  const value = {
    ...state,
    // Farmer operations
    fetchFarmer,
    createFarmer,
    updateFarmer,
    // Farm operations
    fetchFarms,
    createFarm,
    updateFarm,
    deleteFarm,
    // Activity operations
    fetchActivities,
    createActivity,
    deleteActivity,
    // Advisory operations
    fetchAdvisories,
    createAdvisory,
    // Reminder operations
    fetchReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    // Utility functions
    clearError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
