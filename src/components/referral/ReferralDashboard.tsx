
import React, { useState } from 'react';
import { Copy, Share2, Gift, TrendingUp, Calendar, QrCode, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ReferralDashboard = () => {
  const { t } = useLanguage();
  const [referralCode] = useState("JR-ST12345-ABC");
  const stats = {
    totalReferrals: 4,
    investmentGenerated: 15000,
    daysEarned: 15,
    pendingDays: 3
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success(t('copyReferralCode'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#065f46] to-[#047857] px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">
          {t('referralDashboard')}
        </h1>

        {/* Referral Code Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">{t('yourReferralCode')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <code className="bg-white/5 px-4 py-2 rounded-lg text-xl font-mono text-white flex-1">
                {referralCode}
              </code>
              <Button variant="outline" size="icon" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <p className="text-lg font-semibold text-white">{stats.totalReferrals}</p>
              </div>
              <p className="text-sm text-white/60 mt-1">{t('totalReferrals')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <p className="text-lg font-semibold text-white">€{stats.investmentGenerated}</p>
              </div>
              <p className="text-sm text-white/60 mt-1">{t('investmentGenerated')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="text-lg font-semibold text-white">{stats.daysEarned} giorni</p>
              </div>
              <p className="text-sm text-white/60 mt-1">{t('daysEarned')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="text-lg font-semibold text-white">{stats.pendingDays} giorni</p>
              </div>
              <p className="text-sm text-white/60 mt-1">{t('pendingDays')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-sm text-white/80">
              {t('referralInfo')}
            </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralDashboard;
