import React from 'react';
import { LogIngestionStudio } from '../components/telemetry/LogIngestionStudio';
import { AssetInventoryTable } from '../components/telemetry/AssetInventoryTable';
import { EventCorrelationView } from '../components/telemetry/EventCorrelationView';

export const TelemetryPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <LogIngestionStudio />
      <EventCorrelationView />
      <AssetInventoryTable />
    </div>
  );
};
