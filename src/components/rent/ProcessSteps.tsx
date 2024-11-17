import React from 'react';
import { User, Upload, CheckCircle, Home } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Personal Info',
    desc: 'Basic details and student status',
    color: 'from-primary-dark/20 to-primary/20'
  },
  {
    icon: Upload,
    title: 'Documents',
    desc: 'Upload required guarantees',
    color: 'from-primary/20 to-primary-light/20'
  },
  {
    icon: CheckCircle,
    title: 'Verification',
    desc: 'Quick approval process',
    color: 'from-primary-light/20 to-primary/20'
  },
  {
    icon: Home,
    title: 'Move In',
    desc: 'Welcome to your new home',
    color: 'from-primary/20 to-primary-dark/20'
  }
];

const ProcessSteps = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 animate-fade-in">
      {steps.map((step, index) => (
        <div
          key={index}
          className="glass-card group relative p-6 hover:scale-[1.02] transition-all duration-300"
          style={{
            background: `linear-gradient(to bottom right, ${step.color})`
          }}
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <div className="relative flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
            <step.icon className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/60">{step.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;