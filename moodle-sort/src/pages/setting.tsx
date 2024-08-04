import { Card, CardBody } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";

export const SettingPage = () => {
  return (
    <div className="flex flex-col gap-3 w-full h-[400px]">
      <Switch className="w-full">Render Course Buttons</Switch>
      <Switch className="w-full">Clear Original Courses</Switch>
    </div>
  );
};
