import React from 'react';
import { User, Upload, CheckCircle, Home } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Personal Info',
    desc: 'Basic details and student status',
    color: 'from-green-500/20 to-green-600/20'
  },
  {
    icon: Upload,
    title: 'Documents',
    desc: 'Upload required guarantees',
    color: 'from-emerald-500/20 to-emerald-600/20'
  },
  {
    icon: CheckCircle,
    title: 'Verification',
    desc: 'Quick approval process',
    color: 'from-teal-500/20 to-teal-600/20'
  },
  {
    icon: Home,
    title: 'Move In',
    desc: 'Welcome to your new home',
    color: 'from-green-500/20 to-green-600/20'
  }
];

const ProcessSteps = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="group relative bg-gradient-to-br border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:scale-[1.02]"
          style={{
            background: `linear-gradient(to bottom right, ${step.color})`
          }}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <div className="relative">
            <step.icon className="w-8 h-8 text-white/80 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-white/60">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;