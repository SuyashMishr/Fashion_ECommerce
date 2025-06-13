import React from 'react';
import { CheckCircleIcon, ClockIcon, XCircleIcon, TruckIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

interface StatusStep {
  status: string;
  label: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  date?: string;
}

interface OrderStatusTrackerProps {
  currentStatus: string;
  statusHistory?: Array<{
    status: string;
    changedAt: string;
    note?: string;
  }>;
}

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ currentStatus, statusHistory = [] }) => {
  // Define all possible statuses and their display information
  const allStatuses: StatusStep[] = [
    {
      status: 'pending',
      label: 'Order Placed',
      description: 'Your order has been received',
      icon: <ClockIcon className="h-8 w-8 text-gray-400" />,
    },
    {
      status: 'confirmed',
      label: 'Confirmed',
      description: 'Your order has been confirmed',
      icon: <CheckCircleIcon className="h-8 w-8 text-gray-400" />,
    },
    {
      status: 'processing',
      label: 'Processing',
      description: 'Your order is being processed',
      icon: <ShoppingBagIcon className="h-8 w-8 text-gray-400" />,
    },
    {
      status: 'shipped',
      label: 'Shipped',
      description: 'Your order has been shipped',
      icon: <TruckIcon className="h-8 w-8 text-gray-400" />,
    },
    {
      status: 'delivered',
      label: 'Delivered',
      description: 'Your order has been delivered',
      icon: <CheckCircleIcon className="h-8 w-8 text-gray-400" />,
    },
  ];

  // Special statuses that interrupt the normal flow
  const specialStatuses: { [key: string]: StatusStep } = {
    cancelled: {
      status: 'cancelled',
      label: 'Cancelled',
      description: 'Your order has been cancelled',
      icon: <XCircleIcon className="h-8 w-8 text-red-500" />,
    },
    returned: {
      status: 'returned',
      label: 'Returned',
      description: 'Your order has been returned',
      icon: <XCircleIcon className="h-8 w-8 text-orange-500" />,
    },
  };

  // Get the index of the current status
  const currentStatusIndex = allStatuses.findIndex(step => step.status === currentStatus);
  
  // Check if we have a special status
  const isSpecialStatus = currentStatus === 'cancelled' || currentStatus === 'returned';

  // Add dates from status history
  const steps = allStatuses.map(step => {
    const historyEntry = statusHistory.find(entry => entry.status === step.status);
    if (historyEntry) {
      return {
        ...step,
        date: new Date(historyEntry.changedAt).toLocaleDateString(),
      };
    }
    return step;
  });

  return (
    <div className="w-full py-6">
      {isSpecialStatus ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          {specialStatuses[currentStatus].icon}
          <h3 className="text-xl font-semibold text-gray-800">
            {specialStatuses[currentStatus].label}
          </h3>
          <p className="text-gray-600">
            {specialStatuses[currentStatus].description}
          </p>
          {statusHistory.find(entry => entry.status === currentStatus)?.note && (
            <div className="mt-2 text-sm text-gray-500">
              Note: {statusHistory.find(entry => entry.status === currentStatus)?.note}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between w-full mb-8">
            {steps.map((step, index) => (
              <div key={step.status} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full 
                  ${index <= currentStatusIndex ? 'bg-blue-600' : 'bg-gray-200'} 
                  transition-all duration-500`}
                >
                  <div className="text-white">{React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, {
                    className: `h-8 w-8 ${index <= currentStatusIndex ? 'text-white' : 'text-gray-400'}`
                  })}</div>
                </div>
                <div className="mt-2 text-center">
                  <h3 className={`text-sm font-medium ${index <= currentStatusIndex ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.label}
                  </h3>
                  {step.date && (
                    <p className="mt-1 text-xs text-gray-500">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 bg-gray-200" />
            <div 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500" 
              style={{ 
                width: `${currentStatusIndex >= 0 
                  ? (currentStatusIndex / (steps.length - 1)) * 100
                  : 0}%` 
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderStatusTracker;