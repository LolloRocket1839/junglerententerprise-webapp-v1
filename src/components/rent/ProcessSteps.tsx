import React, { useState } from 'react';
import { User, Upload, CheckCircle, Home } from 'lucide-react';
import DocumentUploadDialog from './DocumentUploadDialog';

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
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`glass-card group relative p-6 hover:scale-[1.02] transition-all duration-300 ${
              index === 1 ? 'cursor-pointer' : ''
            }`}
            style={{
              background: `linear-gradient(to bottom right, ${step.color})`
            }}
            onClick={() => {
              if (index === 1) setIsUploadOpen(true);
            }}
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative">
              <step.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/60">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <DocumentUploadDialog 
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
      />
    </>
  );
};

export default ProcessSteps;