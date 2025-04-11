"use client";

import React, { useState } from "react";
import CollapsibleSection from "../components/collapsablesection/CollapsibleSection";
import UserProfileSettings from "../components/UserProfileSettings";

const UserDashboard: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <div className="w-full bg-[url(/comb.png)] max-w-3xl mx-auto py-6 space-y-4">
      <CollapsibleSection
        id="profile"
        title="👤 Мій профіль"
        isOpen={openSection === "profile"}
        onToggle={() => handleToggle("profile")}
      >
      <UserProfileSettings />
      </CollapsibleSection>

      <CollapsibleSection
        id="favorites"
        title="⭐ Улюблені майстри"
        isOpen={openSection === "favorites"}
        onToggle={() => handleToggle("favorites")}
      >
        <p>Тут буде список улюблених майстрів, записи до них, посилання на дописи.</p>
      </CollapsibleSection>

      <CollapsibleSection
        id="helper"
        title="🧠 Помічник"
        isOpen={openSection === "helper"}
        onToggle={() => handleToggle("helper")}
      >
        <p>Блок з поясненнями, кнопкою &quot;похвалитись у соцмережах&quot; тощо.</p>
      </CollapsibleSection>

      <CollapsibleSection
        id="terms"
        title="📜 Умови користування"
        isOpen={openSection === "terms"}
        onToggle={() => handleToggle("terms")}
      >
        <p>Умови та правила платформи.</p>
      </CollapsibleSection>
    </div>
  );
};

export default UserDashboard;

