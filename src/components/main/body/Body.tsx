import Flashcards from "./flashcards/Flashcards";
import Nametag from "./nametag/Nametag";
import Notes from "./notes/Notes";
import Storybook from "./storybook/Storybook";
import WeeklyPlan from "./weeklyplan/WeeklyPlan";

const DEFAULT_SERVICE = "nametag";

const SERVICES = [
  { id: "custom-nametag", component: Nametag },
  { id: "custom-notes", component: Notes },
  { id: "custom-flashcards", component: Flashcards },
  { id: "custom-storybook", component: Storybook },
  { id: "custom-weekly-plan", component: WeeklyPlan },
];

export default function Body({ activeService = DEFAULT_SERVICE }) {
  const activeServiceObj = SERVICES.find(
    (service) => service.id === activeService
  );

  const ActiveComponent = activeServiceObj?.component ?? Nametag;

  return (
    <div className="w-full flex-1" data-active-service={activeService}>
      <ActiveComponent />
    </div>
  );
}
