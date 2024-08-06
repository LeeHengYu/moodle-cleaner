import { Card, CardBody } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";

export const SettingPage = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-[408px]">
      <Switch className="w-full">Render Course Buttons</Switch>
      <Switch className="w-full">Clear Original Courses</Switch>
      <Card>
        <CardBody>
          <p className="text-black text-medium font-serif text-left text-wrap max-w-[500px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            voluptatibus commodi reiciendis assumenda, iure dolor natus
            veritatis sed! Velit explicabo nam eligendi aperiam ab iure ex
            nostrum veniam animi et, a dolorum incidunt assumenda iste aliquam
            facilis quaerat expedita saepe.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
