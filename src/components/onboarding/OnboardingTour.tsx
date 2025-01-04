import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const OnboardingTour = () => {
  const [run, setRun] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only show the tour if it hasn't been shown before
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: 'Welcome to Jungle Rent! Let us show you around our platform.',
      disableBeacon: true,
    },
    {
      target: '.invest-link',
      content: 'Discover investment opportunities in student housing and earn above-market returns.',
    },
    {
      target: '.rent-link',
      content: 'Find your perfect student accommodation with our smart matching system.',
    },
    {
      target: '.stay-link',
      content: 'Looking for short-term stays? Browse our curated selection of properties.',
    },
    {
      target: '.auth-buttons',
      content: 'Create an account to start your journey with Jungle Rent!',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      localStorage.setItem('hasSeenTour', 'true');
      
      toast({
        title: "Tour completed!",
        description: "Ready to get started? Create your account now!",
      });
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#22c55e',
          textColor: '#fff',
          backgroundColor: '#1a1f2c',
        },
        tooltip: {
          padding: '20px',
        },
        buttonNext: {
          backgroundColor: '#22c55e',
        },
        buttonBack: {
          color: '#22c55e',
        },
      }}
    />
  );
};

export default OnboardingTour;