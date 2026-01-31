import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('kb_user');
    const savedVehicles = localStorage.getItem('kb_vehicles');
    const savedHistory = localStorage.getItem('kb_service_history');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
    if (savedHistory) setServiceHistory(JSON.parse(savedHistory));
  }, []);

  // Mock login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('kb_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setVehicles([]);
    setSelectedVehicle(null);
    localStorage.clear();
  };

  const addVehicle = (vehicle) => {
    const newVehicle = { ...vehicle, id: Date.now().toString() };
    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem('kb_vehicles', JSON.stringify(updatedVehicles));
    if (!selectedVehicle) setSelectedVehicle(newVehicle);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const addServiceRecord = (record) => {
    const newRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...record
    };
    const updatedHistory = [newRecord, ...serviceHistory];
    setServiceHistory(updatedHistory);
    localStorage.setItem('kb_service_history', JSON.stringify(updatedHistory));
  };

  const value = {
    user,
    login,
    logout,
    vehicles,
    addVehicle,
    selectedVehicle,
    setSelectedVehicle,
    notifications,
    addNotification,
    serviceHistory,
    addServiceRecord
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
