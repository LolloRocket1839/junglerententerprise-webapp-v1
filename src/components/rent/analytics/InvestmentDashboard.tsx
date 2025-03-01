
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvestmentTimeline from './InvestmentTimeline';
import DistributionChart from './DistributionChart';
import PerformanceComparison from './PerformanceComparison';

// Mock data (in a real app, this would come from your API)
const investmentData = {
  propertyId: "RM-SLAT-01",
  propertyName: "Via Scipio Slataper 9, Roma",
  acquisitionDate: "2026-04-15",
  totalValue: 320000,
  investorContribution: 320000,
  currentDistribution: {
    jungleRent: 75,
    investors: 25
  },
  distributionTimeline: [
    { date: "2026-10-15", jungleRent: 75, investors: 25 },
    { date: "2027-04-15", jungleRent: 50, investors: 50 },
    { date: "2027-10-15", jungleRent: 25, investors: 75 },
    { date: "2028-04-15", jungleRent: 10, investors: 90 }
  ],
  nextPaymentDate: "2026-10-15",
  projectedReturns: {
    annualYield: 6.8,
    totalReturn: 47.6
  },
  alternativeInvestments: {
    depositAccount: 4.75,
    traditionalRealEstate: 5.3,
    etfReit: 3.0
  },
  decisionDate: "2033-04-15"
};

const InvestmentDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{investmentData.propertyName}</h1>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>ID: {investmentData.propertyId}</span>
          </div>
        </div>
        <Button variant="outline" className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          Notifiche
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Investimento Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">€{investmentData.totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rendimento Annuo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{investmentData.projectedReturns.annualYield}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prossimo Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <p className="text-lg">{new Date(investmentData.nextPaymentDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Chart and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Rendita</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <DistributionChart data={investmentData.currentDistribution} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timeline Investimento</CardTitle>
          </CardHeader>
          <CardContent>
            <InvestmentTimeline data={investmentData.distributionTimeline} />
          </CardContent>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Confronto Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PerformanceComparison data={investmentData.alternativeInvestments} currentYield={investmentData.projectedReturns.annualYield} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentDashboard;
