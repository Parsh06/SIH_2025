import { motion } from "framer-motion";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  Crop,
  Droplets,
  Edit3,
  MapPin,
  Phone,
  Ruler,
  Save,
  Settings,
  Sprout,
  User,
} from "lucide-react";
import React, { useState } from "react";
import Page from "../components/Page";
import Button from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import { useApp } from "../context/AppStore";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useI18n } from "../context/I18nContext";

export default function Profile() {
  const { t } = useI18n();
  const { state, updateProfile } = useApp();
  const { user } = useAuth();
  const { farmer, farms, activities, createFarmer, updateFarmer } = useData();

  const [form, setForm] = useState({
    name: farmer?.name || user?.displayName || "",
    email: user?.email || "",
    phoneNumber: farmer?.phoneNumber || "",
    location: farmer?.location || "",
    landSize: farmer?.landSize || "",
    crop: farmer?.crop || "",
    soil: farmer?.soil || "",
    irrigation: farmer?.irrigation || "",
    experience: farmer?.experience || "",
    farmType: farmer?.farmType || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Update form when farmer data loads
  React.useEffect(() => {
    if (farmer) {
      setForm((prev) => ({
        ...prev,
        name: farmer.name || user?.displayName || "",
        phoneNumber: farmer.phoneNumber || "",
        location: farmer.location || "",
        landSize: farmer.landSize || "",
        crop: farmer.crop || "",
        soil: farmer.soil || "",
        irrigation: farmer.irrigation || "",
        experience: farmer.experience || "",
        farmType: farmer.farmType || "",
      }));
    }
  }, [farmer, user]);

  const onSave = async () => {
    setIsSaving(true);
    try {
      // Ensure required fields are present
      const farmerData = {
        name: form.name || "",
        phoneNumber: form.phoneNumber || "",
        location: form.location || "",
        // Include optional fields if they exist
        ...(form.landSize && { landSize: form.landSize }),
        ...(form.crop && { crop: form.crop }),
        ...(form.soil && { soil: form.soil }),
        ...(form.irrigation && { irrigation: form.irrigation }),
        ...(form.experience && { experience: form.experience }),
        ...(form.farmType && { farmType: form.farmType }),
      };

      console.log("Sending farmer data:", farmerData);

      if (farmer) {
        // Update existing farmer
        await updateFarmer(farmer._id, farmerData);
      } else {
        // Create new farmer
        await createFarmer(farmerData);
      }
      setSaveStatus("success");
      setIsEditing(false);
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("Profile save error:", error);
      const errorMessage = error.message || "Failed to save profile";
      setSaveStatus(`error: ${errorMessage}`);
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const formFields = [
    { name: "name", label: t["profile.name"], icon: User, required: true },
    {
      name: "email",
      label: t["profile.email"],
      icon: User,
      required: true,
      disabled: true,
    },
    {
      name: "phoneNumber",
      label: t["profile.phone"],
      icon: Phone,
      required: false,
    },
    {
      name: "location",
      label: t["profile.location"],
      icon: MapPin,
      required: false,
    },
    {
      name: "landSize",
      label: t["profile.landSize"],
      icon: Ruler,
      required: false,
    },
    { name: "crop", label: t["profile.crop"], icon: Crop, required: false },
    { name: "soil", label: t["profile.soil"], icon: Sprout, required: false },
    {
      name: "irrigation",
      label: t["profile.irrigation"],
      icon: Droplets,
      required: false,
    },
  ];

  return (
    <Page
      title="Farmer Profile"
      subtitle="Manage your farming profile and preferences"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="w-full h-full bg-gradient-to-br from-leaf-500 to-leaf-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "F"}
              </div>
              <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Camera size={16} className="text-gray-600" />
              </button>
            </div>
            <CardTitle className="text-xl">{form.name || "Farmer"}</CardTitle>
            <CardDescription>{form.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{form.location || "Location not set"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Ruler size={16} />
                <span>{form.landSize || "Land size not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Crop size={16} />
                <span>{form.crop || "Crop not specified"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 size={20} />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your farming profile details
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setForm({
                          ...state.profile,
                          name: user?.displayName || "",
                          email: user?.email || "",
                        });
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={onSave}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {saveStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                  saveStatus.startsWith("success")
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {saveStatus.startsWith("success") ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                <span className="text-sm">
                  {saveStatus.startsWith("success")
                    ? "Profile updated successfully!"
                    : saveStatus.startsWith("error:")
                    ? saveStatus.replace("error: ", "")
                    : "Failed to update profile. Please try again."}
                </span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <Label className="flex items-center gap-2">
                      <IconComponent size={16} className="text-leaf-600" />
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>
                    <Input
                      value={form[field.name] || ""}
                      onChange={(e) =>
                        setForm({ ...form, [field.name]: e.target.value })
                      }
                      disabled={!isEditing || field.disabled}
                      className={!isEditing ? "bg-gray-50" : ""}
                      placeholder={`Enter ${
                        field.label?.toLowerCase() || field.name
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-leaf-50 rounded-lg">
              <h4 className="font-medium text-leaf-800 mb-2">
                Farming Statistics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-leaf-600">
                    {farmer?.experience || "0"}
                  </div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-leaf-600">
                    {farms.length}
                  </div>
                  <div className="text-xs text-gray-600">Farms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-leaf-600">
                    {activities.length}
                  </div>
                  <div className="text-xs text-gray-600">Activities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-leaf-600">
                    {farmer?.farmType || "N/A"}
                  </div>
                  <div className="text-xs text-gray-600">Farm Type</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
