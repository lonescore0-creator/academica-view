import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Check } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { toast } from 'sonner';

interface PWAInstallButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  className = '' 
}) => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      toast.success('App installed successfully! You can now access it from your home screen.');
    } else {
      toast.error('Failed to install app. Please try again.');
    }
  };

  if (isInstalled) {
    return (
      <Button 
        variant="outline" 
        size={size} 
        disabled 
        className={`${className} opacity-75`}
      >
        <Check className="h-4 w-4 mr-2" />
        App Installed
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleInstall}
      className={`${className} bg-primary hover:bg-primary/90`}
    >
      <Download className="h-4 w-4 mr-2" />
      <Smartphone className="h-4 w-4 mr-1" />
      Install App
    </Button>
  );
};

export default PWAInstallButton;