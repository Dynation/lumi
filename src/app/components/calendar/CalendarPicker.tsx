"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { EventInput } from "@fullcalendar/core";
import i18n from "@/lib/i18n";
import "moment-timezone";
import "moment-timezone/builds/moment-timezone-with-data.min.js";
import "moment/locale/uk"; // Ukrainian locale
import "moment/locale/fr"; // French locale

interface Appointment {
  dateTime: string;
  id: string;
  type: string; // в майбутньому замінимо на тип з ServiceSwiper
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  licensePlate: string;
  vehicleType: string;
  notes: string | null;
}

interface CalendarPickerProps {
  appointments: Appointment[];
  onDateSelect: (date: string) => Promise<void>;
  selectedDate?: string | null;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ appointments, onDateSelect }) => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [disabledDays, setDisabledDays] = useState<string[]>([]);

  useEffect(() => {
    const formattedEvents = appointments.map((appt) => {
      const date = new Date(appt.dateTime);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split(":00.000")[0];

      return {
        title: formattedDate,
        start: formattedDate,
        allDay: true,
      };
    });

    setEvents(formattedEvents);
  }, [appointments]);

  useEffect(() => {
    const groupedByDate: Record<string, number> = {};

    appointments.forEach((appt) => {
      const dateKey = new Date(appt.dateTime).toISOString().split("T")[0];
      groupedByDate[dateKey] = (groupedByDate[dateKey] || 0) + 1;
    });

    const fullDays = Object.entries(groupedByDate)
      .filter(([, count]) => count >= 32)
      .map(([date]) => date);

    setDisabledDays(fullDays);
  }, [appointments]);

  const handleDateClick = (info: { dateStr: string }) => {
    if (disabledDays.includes(info.dateStr)) return;
    onDateSelect(info.dateStr);
  };

  return (
    <div
className="calendar-container"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
        timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
        locale={i18n.language}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        selectable
        validRange={{
          start: new Date().toISOString().split("T")[0],
        }}
        dayCellClassNames={({ date }) =>
          disabledDays.includes(date.toISOString().split("T")[0]) ? "opacity-30 pointer-events-none" : ""
        }
        height="120%"
      />
    </div>
  );
};

export default CalendarPicker;
