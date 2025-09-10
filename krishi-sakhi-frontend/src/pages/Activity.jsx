import React, { useState, useEffect } from "react";
import Page from "../components/Page";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useI18n } from "../context/I18nContext";
import { useData } from "../context/DataContext";
import VoiceControls from "../components/VoiceControls";

export default function Activity() {
  const { t } = useI18n();
  const { activities, farms, loading, createActivity, deleteActivity, error } =
    useData();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("General");
  const [selectedFarm, setSelectedFarm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get farm display name by ID or object
  const getFarmName = (farmValue) => {
    if (!farmValue) return "Unknown Farm";

    // If farm is an object, return its location
    if (typeof farmValue === "object") {
      return farmValue.location || `Farm ${farmValue._id?.slice(-4) || "??"}`;
    }

    // Otherwise, assume it's an ID string
    const farm = farms.find((f) => f._id === farmValue);
    return farm ? farm.location || `Farm ${farm._id.slice(-4)}` : String(farmValue);
  };

  const add = async () => {
    if (!description.trim() || !selectedFarm) return;

    setIsSubmitting(true);
    try {
      await createActivity({
        farm: selectedFarm,
        type,
        description: description.trim(),
        timestamp: new Date().toISOString(),
      });
      setDescription("");
    } catch (error) {
      console.error("Failed to create activity:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (activityId) => {
    try {
      await deleteActivity(activityId);
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  return (
    <Page title={t["activity.title"]} subtitle={t["activity.subtitle"]}>
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-2 w-full items-center">
        <select
          value={selectedFarm}
          onChange={(e) => setSelectedFarm(e.target.value)}
          className="input w-40"
          disabled={isSubmitting || loading.activities || farms.length === 0}
        >
          <option value="">
            {farms.length === 0 ? "No farms available" : "Select Farm"}
          </option>
          {farms.map((farm) => (
            <option key={farm._id} value={farm._id}>
              {farm.location || `Farm ${farm._id.slice(-4)}`}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input w-32"
          disabled={isSubmitting || loading.activities}
        >
          <option value="General">General</option>
          <option value="Planting">Planting</option>
          <option value="Harvesting">Harvesting</option>
          <option value="Irrigation">Irrigation</option>
          <option value="Fertilizing">Fertilizing</option>
          <option value="Pest Control">Pest Control</option>
        </select>

        <input
          type="text"
          className="input flex-grow min-w-0"
          placeholder={t["activity.placeholder"]}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting || loading.activities}
        />

        <Button
          onClick={add}
          disabled={
            isSubmitting ||
            loading.activities ||
            !description.trim() ||
            !selectedFarm
          }
          className="whitespace-nowrap"
        >
          {isSubmitting ? "Adding..." : t["action.add"]}
        </Button>

        <VoiceControls onResult={setDescription} />
      </div>

      {/* Activities List */}
      <div className="mt-4">
        {loading.activities ? (
          <div className="p-4">
            <div className="animate-pulse text-center text-soil-700">
              Loading activities...
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {activities.map((activity) => (
              <li
                key={activity._id}
                className="card p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{activity.type}</div>
                  <div className="text-soil-700">{activity.description}</div>
                  {activity.farm && (
                    <div className="text-xs text-gray-500 mt-1">
                      Farm: {getFarmName(activity.farm)}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-soil-700">
                    {new Date(
                      activity.timestamp || activity.createdAt || Date.now()
                    ).toLocaleString()}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => remove(activity._id)}
                    disabled={loading.activities}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-8 text-soil-700">
                No activities yet. Add your first activity above!
              </div>
            )}
          </ul>
        )}
      </div>
    </Page>
  );
}
