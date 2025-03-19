"use client"

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Sun,
  Zap,
  DollarSign,
  Leaf,
  BarChart3,
  Calendar,
  Home,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Wallet,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleMap from "./GoogleMap";

type PanelSpecs = {
  capacity: string
  dimensions: string
  lifetime: string
}

type SolarPotentialSummary = {
  availableArea: string
  sunshine: number
  carbonOffset: number
  panelSpecs: PanelSpecs
}

type FinancingOption = {
  title: string
  description: string
  netCost: number
  savingsYear1: number
  netSavings20yr: number
  paybackYears: number
  rebateValue: number
  propertyValueIncrease: string
  outOfPocketCost: number
  annualLoanPayment?: number
  interestRate?: number
  annualLeasingCost?: number
  payback?: string
}

type SolarSystemInfo = {
  solarCoverage: number
  initialEnergyProduction: number
  gridExportPercentage: number
  netMeteringAllowed: boolean
}

type ElectricityBillInfo = {
  userMonthlyBill: number
}

type CalculationResult = {
  solarPotentialSummary: SolarPotentialSummary
  financingOptions: {
    cashPurchase: FinancingOption
    loan: FinancingOption
    lease: FinancingOption
  }
  solarSystemInfo: SolarSystemInfo
  recommendedPanels: number
  electricityBillInfo: ElectricityBillInfo
}

interface SolarResultsPageProps {
  calculationResult: CalculationResult
  onBackToForm: () => void
  address: string
  latitude: number
  longitude: number
}

const SolarResultsPage = ({ calculationResult, onBackToForm, address, latitude, longitude }: SolarResultsPageProps) => {
  // Destructure the calculation result for easier access
  const {
    solarPotentialSummary,
    financingOptions,
    solarSystemInfo,
    recommendedPanels,
    electricityBillInfo,
  } = calculationResult;
  
  // State for collapsible sections on mobile
  const [showSystemDetails, setShowSystemDetails] = useState(true);
  const [showEnergyProduction, setShowEnergyProduction] = useState(true);
  
  // State for the financing option tabs/dropdown
  const [selectedFinancingOption, setSelectedFinancingOption] = useState("cash");

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  // Calculate monthly savings
  const monthlySavings = financingOptions.cashPurchase.savingsYear1 / 12

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header with summary */}
      <div className="bg-white shadow-md py-4 md:py-6">
        <div className="container mx-auto px-3 md:px-4 max-w-6xl">
          <div className="flex items-center mb-3 md:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToForm}
              className="mr-1 md:mr-2 px-2 md:px-3"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Sun className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-2 md:mr-3" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Your Solar Savings</h1>
          </div>

          {/* Add Google Map */}
          <div className="mb-6">
            <GoogleMap latitude={latitude} longitude={longitude} address={address} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                <div className="text-center">
                  <div className="flex justify-center">
                    <DollarSign className="h-8 w-8 md:h-10 md:w-10 text-green-600 mb-1 md:mb-2" />
                  </div>
                  <h2 className="text-base md:text-lg font-medium text-gray-700">Annual Savings</h2>
                  <p className="text-2xl md:text-3xl font-bold text-green-600">
                    ${formatNumber(financingOptions.cashPurchase.savingsYear1)}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    ${formatNumber(monthlySavings)} per month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                <div className="text-center">
                  <div className="flex justify-center">
                    <BarChart3 className="h-8 w-8 md:h-10 md:w-10 text-blue-600 mb-1 md:mb-2" />
                  </div>
                  <h2 className="text-base md:text-lg font-medium text-gray-700">20-Year Savings</h2>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">
                    ${formatNumber(financingOptions.cashPurchase.netSavings20yr)}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    With cash purchase
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                <div className="text-center">
                  <div className="flex justify-center">
                    <Calendar className="h-8 w-8 md:h-10 md:w-10 text-amber-600 mb-1 md:mb-2" />
                  </div>
                  <h2 className="text-base md:text-lg font-medium text-gray-700">Payback Period</h2>
                  <p className="text-2xl md:text-3xl font-bold text-amber-600">
                    {Math.floor(financingOptions.cashPurchase.paybackYears)} years
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Return on investment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-6xl">
        {/* System Details */}
        <div className="grid grid-cols-1 gap-4 md:gap-8 mb-8 md:mb-12">
          <Card>
            <CardHeader className="py-3 md:py-4 px-4 md:px-6 cursor-pointer flex justify-between items-center" onClick={() => setShowSystemDetails(!showSystemDetails)}>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Sun className="h-5 w-5 mr-2 text-green-500" />
                Solar System Details
              </CardTitle>
              <div className="md:hidden">
                {showSystemDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {(showSystemDetails || window.innerWidth >= 768) && (
              <CardContent className="pt-2 md:pt-4 px-4 md:px-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Recommended System Size</span>
                    <span className="font-semibold text-sm md:text-base">{recommendedPanels} panels</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Panel Capacity</span>
                    <span className="font-semibold text-sm md:text-base">{solarPotentialSummary.panelSpecs.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Available Roof Area</span>
                    <span className="font-semibold text-sm md:text-base">{solarPotentialSummary.availableArea}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Annual Sunshine Hours</span>
                    <span className="font-semibold text-sm md:text-base">{formatNumber(solarPotentialSummary.sunshine)} hours</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Panel Dimensions</span>
                    <span className="font-semibold text-sm md:text-base">{solarPotentialSummary.panelSpecs.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-600">System Lifetime</span>
                    <span className="font-semibold text-sm md:text-base">{solarPotentialSummary.panelSpecs.lifetime}</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader className="py-3 md:py-4 px-4 md:px-6 cursor-pointer flex justify-between items-center" onClick={() => setShowEnergyProduction(!showEnergyProduction)}>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Zap className="h-5 w-5 mr-2 text-amber-500" />
                Energy Production
              </CardTitle>
              <div className="md:hidden">
                {showEnergyProduction ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </CardHeader>
            {(showEnergyProduction || window.innerWidth >= 768) && (
              <CardContent className="pt-2 md:pt-4 px-4 md:px-6">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm md:text-base text-gray-600">Solar Coverage</span>
                      <span className="font-semibold text-sm md:text-base">{solarSystemInfo.solarCoverage.toFixed(1)}%</span>
                    </div>
                    <Progress value={solarSystemInfo.solarCoverage} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Annual Energy Production</span>
                    <span className="font-semibold text-sm md:text-base">{solarSystemInfo.initialEnergyProduction.toFixed(0)} kWh</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Grid Export Percentage</span>
                    <span className="font-semibold text-sm md:text-base">{solarSystemInfo.gridExportPercentage.toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Net Metering Available</span>
                    <span className="font-semibold flex items-center text-sm md:text-base">
                      {solarSystemInfo.netMeteringAllowed ? 
                        <><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Yes</> : 
                        'No'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm md:text-base text-gray-600">Your Monthly Electric Bill</span>
                    <span className="font-semibold text-sm md:text-base">${electricityBillInfo.userMonthlyBill}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-600">Carbon Offset</span>
                    <span className="font-semibold text-sm md:text-base">{formatNumber(solarPotentialSummary.carbonOffset)} kg/MWh</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Financing Options */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Financing Options</h2>
        
        {/* Mobile Financing Option Selector */}
        <div className="md:hidden mb-6">
          <p className="text-sm text-gray-600 mb-2">Choose your preferred financing option:</p>
          <Select 
            defaultValue="cash" 
            onValueChange={(value) => setSelectedFinancingOption(value)}
            value={selectedFinancingOption}
          >
            <SelectTrigger className="w-full bg-white border-gray-300 hover:border-green-400 transition-colors shadow-sm py-6 rounded-lg">
              <SelectValue placeholder="Select financing option">
                <div className="flex items-center">
                  {selectedFinancingOption === "cash" && (
                    <><Wallet className="h-5 w-5 text-green-600 mr-2" />{financingOptions.cashPurchase.title}</>
                  )}
                  {selectedFinancingOption === "loan" && (
                    <><CreditCard className="h-5 w-5 text-blue-600 mr-2" />{financingOptions.loan.title}</>
                  )}
                  {selectedFinancingOption === "lease" && (
                    <><FileText className="h-5 w-5 text-purple-600 mr-2" />{financingOptions.lease.title}</>
                  )}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
              <SelectItem value="cash" className="py-3 flex items-center">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 text-green-600 mr-2" />
                  <span>{financingOptions.cashPurchase.title}</span>
                </div>
              </SelectItem>
              <SelectItem value="loan" className="py-3 flex items-center">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  <span>{financingOptions.loan.title}</span>
                </div>
              </SelectItem>
              <SelectItem value="lease" className="py-3 flex items-center">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-purple-600 mr-2" />
                  <span>{financingOptions.lease.title}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Desktop Tabs */}
        <Tabs 
          defaultValue="cash" 
          value={selectedFinancingOption} 
          onValueChange={setSelectedFinancingOption}
          className="mb-8 md:mb-12"
        >
          <TabsList className="hidden md:flex mb-8 p-1 bg-gray-100 rounded-lg overflow-hidden">
            <TabsTrigger 
              value="cash" 
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-green-500 data-[state=active]:border-b-2 transition-all py-3"
            >
              <div className="flex items-center justify-center">
                <Wallet className="h-5 w-5 mr-2 text-green-600" />
                <span>{financingOptions.cashPurchase.title}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="loan" 
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-blue-500 data-[state=active]:border-b-2 transition-all py-3"
            >
              <div className="flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                <span>{financingOptions.loan.title}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="lease" 
              className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-purple-500 data-[state=active]:border-b-2 transition-all py-3"
            >
              <div className="flex items-center justify-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                <span>{financingOptions.lease.title}</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cash" className="mt-0">
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 py-3 md:py-4 px-4 md:px-6">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg md:text-xl">{financingOptions.cashPurchase.title}</CardTitle>
                  <Badge variant="outline" className="bg-white text-xs md:text-sm">Recommended</Badge>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{financingOptions.cashPurchase.description}</p>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Key Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">Highest Lifetime Savings</p>
                          <p className="text-xs md:text-sm text-gray-600">Save ${formatNumber(financingOptions.cashPurchase.netSavings20yr)} over 20 years</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">Federal Tax Credit</p>
                          <p className="text-xs md:text-sm text-gray-600">${formatNumber(financingOptions.cashPurchase.rebateValue)} rebate</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">Property Value Increase</p>
                          <p className="text-xs md:text-sm text-gray-600">{financingOptions.cashPurchase.propertyValueIncrease}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Financial Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">System Cost</span>
                        <span className="font-semibold text-sm md:text-base">${formatNumber(financingOptions.cashPurchase.netCost)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">First Year Savings</span>
                        <span className="font-semibold text-sm md:text-base">${formatNumber(financingOptions.cashPurchase.savingsYear1)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Payback Period</span>
                        <span className="font-semibold text-sm md:text-base">{Math.floor(financingOptions.cashPurchase.paybackYears)} years</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Lifetime Savings</span>
                        <span className="font-semibold text-sm md:text-base text-green-600">${formatNumber(financingOptions.cashPurchase.netSavings20yr)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan" className="mt-0">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 py-3 md:py-4 px-4 md:px-6">
                <CardTitle className="text-lg md:text-xl">{financingOptions.loan.title}</CardTitle>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{financingOptions.loan.description}</p>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Key Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">No Upfront Cost</p>
                          <p className="text-xs md:text-sm text-gray-600">${financingOptions.loan.outOfPocketCost} down payment</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">Immediate Savings</p>
                          <p className="text-xs md:text-sm text-gray-600">Start saving from day one</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">Property Value Increase</p>
                          <p className="text-xs md:text-sm text-gray-600">{financingOptions.loan.propertyValueIncrease}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Financial Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Down Payment</span>
                        <span className="font-semibold text-sm md:text-base">${financingOptions.loan.outOfPocketCost}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Annual Loan Payment</span>
                        <span className="font-semibold text-sm md:text-base">${financingOptions.loan.annualLoanPayment}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Interest Rate</span>
                        <span className="font-semibold text-sm md:text-base">{financingOptions.loan.interestRate ? `${financingOptions.loan.interestRate}%` : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Lifetime Savings</span>
                        <span className="font-semibold text-sm md:text-base text-green-600">${formatNumber(financingOptions.loan.netSavings20yr)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lease" className="mt-0">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 py-3 md:py-4 px-4 md:px-6">
                <CardTitle className="text-lg md:text-xl">{financingOptions.lease.title}</CardTitle>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{financingOptions.lease.description}</p>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Key Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">No Upfront Cost</p>
                          <p className="text-xs md:text-sm text-gray-600">${financingOptions.lease.outOfPocketCost} down payment</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">No Maintenance Worries</p>
                          <p className="text-xs md:text-sm text-gray-600">Provider handles all maintenance</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm md:text-base">Immediate Savings</p>
                          <p className="text-xs md:text-sm text-gray-600">Payback: {financingOptions.lease.payback}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Financial Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Down Payment</span>
                        <span className="font-semibold text-sm md:text-base">${financingOptions.lease.outOfPocketCost}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Annual Lease Payment</span>
                        <span className="font-semibold text-sm md:text-base">${financingOptions.lease.annualLeasingCost}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Property Value Effect</span>
                        <span className="font-semibold text-sm md:text-base">{financingOptions.lease.propertyValueIncrease}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-sm md:text-base text-gray-600">Lifetime Savings</span>
                        <span className="font-semibold text-sm md:text-base text-green-600">${formatNumber(financingOptions.lease.netSavings20yr)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Environmental Impact */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Environmental Impact</h2>
        <Card className="mb-8 md:mb-12 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Leaf className="h-8 w-8 md:h-10 md:w-10 text-green-600 mx-auto mb-2" />
                <h3 className="text-base md:text-lg font-semibold">Carbon Reduction</h3>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{formatNumber(solarPotentialSummary.carbonOffset)} kg/MWh</p>
                <p className="text-xs md:text-sm text-gray-600">kg/MWh</p>
              </div>
              
              <div className="text-center">
                <Sun className="h-8 w-8 md:h-10 md:w-10 text-green-600 mx-auto mb-2" />
                <h3 className="text-base md:text-lg font-semibold">Clean Energy Generated</h3>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">
                  {formatNumber(solarSystemInfo.initialEnergyProduction)}
                </p>
                <p className="text-xs md:text-sm text-gray-600">kWh per year</p>
              </div>
              
              <div className="text-center sm:col-span-2 md:col-span-1">
                <Home className="h-8 w-8 md:h-10 md:w-10 text-green-600 mx-auto mb-2" />
                <h3 className="text-base md:text-lg font-semibold">Home Energy Covered</h3>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">
                  {solarSystemInfo.solarCoverage.toFixed(1)}%
                </p>
                <p className="text-xs md:text-sm text-gray-600">of your usage</p>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default SolarResultsPage;