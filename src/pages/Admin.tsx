import React from 'react';
import PropertyManager from '@/components/admin/PropertyManager';

const Admin = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] p-6">
      <div className="container mx-auto">
        <PropertyManager />
      </div>
    </div>
  );
};

export default Admin;