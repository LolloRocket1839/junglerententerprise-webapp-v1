import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

const StudentSchedule = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const events = [
    { date: new Date(2024, 2, 15), title: "House Meeting", type: "meeting" },
    { date: new Date(2024, 2, 20), title: "Rent Due", type: "payment" },
    { date: new Date(2024, 2, 25), title: "Room Inspection", type: "inspection" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-8 glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Calendar</h3>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-white/5 rounded-lg p-4"
          />
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-4 glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Upcoming Events</h3>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{event.title}</h4>
                    <p className="text-white/60 text-sm">
                      {event.date.toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.type === 'meeting' ? 'bg-blue-500/20 text-blue-300' :
                    event.type === 'payment' ? 'bg-green-500/20 text-green-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentSchedule;