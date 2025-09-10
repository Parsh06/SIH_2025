import React, { useState } from "react";
import Page from "../components/Page";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { useI18n } from "../context/I18nContext";
import { useData } from "../context/DataContext";

export default function Reminders() {
  const { t } = useI18n();
  const { reminders, loading, error, createReminder, deleteReminder } =
    useData();

  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const add = async () => {
    if (!text || !date) return;
    setIsAdding(true);
    try {
      await createReminder({
        message: text,
        dueDate: new Date(date).toISOString(),
      });
      setText("");
      setDate("");
    } catch (error) {
      console.error("Failed to create reminder:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteReminder(id);
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  return (
    <Page title={t["reminders.title"]}>
      <div className="grid md:grid-cols-3 gap-2">
        <Input
          placeholder={t["reminders.placeholder"]}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={add} disabled={isAdding || loading.reminders}>
          {isAdding ? "Adding..." : t["reminders.addReminder"]}
        </Button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {loading.reminders ? (
          <li className="card p-4 text-center text-gray-500">
            Loading reminders...
          </li>
        ) : reminders.length === 0 ? (
          <li className="card p-4 text-center text-gray-500">
            No reminders yet. Add one above!
          </li>
        ) : (
          reminders.map((reminder) => (
            <li
              key={reminder._id}
              className="card p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{reminder.message}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  {new Date(reminder.dueDate).toLocaleDateString()}
                </span>
                <Button
                  variant="outline"
                  onClick={() => remove(reminder._id)}
                  disabled={loading.reminders}
                >
                  {t["action.delete"]}
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </Page>
  );
}
