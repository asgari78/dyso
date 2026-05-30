import React from 'react';
import  CustomFlashcardsPage  from './custom-flashcards/CustomFlashcardsPage';
import  CustomNametagPage  from './custom-nametag/CustomNametagPage';
import  CustomNotesPage  from './custom-notes/CustomNotesPage';
import  CustomStorybookPage from './custom-storybook/CustomStorybookPage';
import  CustomWeeklyPlanPage  from './custom-weekly-plan/CustomWeeklyPlanPage';

const DEFAULT_SERVICE = 'custom-nametag';

const SERVICES = [
  { id: 'custom-nametag', component: CustomNametagPage },
  { id: 'custom-notes', component: CustomNotesPage },
  { id: 'custom-flashcards', component: CustomFlashcardsPage },
  { id: 'custom-storybook', component: CustomStorybookPage },
  { id: 'custom-weekly-plan', component: CustomWeeklyPlanPage },
];

export default function Body({ activeService = DEFAULT_SERVICE }) {
  // پیدا کردن کامپوننت مربوط به سرویس فعال
  const activeServiceObj = SERVICES.find((service) => service.id === activeService);
  
  // اگر سرویس نامعتبر بود، کامپوننت پیش‌فرض رندر می‌شود
  const ActiveComponent = activeServiceObj ? activeServiceObj.component : CustomNametagPage;

  return (
    <div className="w-full flex-1" data-active-service={activeService}>
      <ActiveComponent />
    </div>
  );
}
