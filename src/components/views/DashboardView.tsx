import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Users, DollarSign, Percent, GraduationCap, Plane } from "lucide-react";
import { properties, applications, bookings } from "@/lib/mock-data";

export function DashboardView() {
  const metrics = {
    totalProperties: properties.length,
    avgOccupancy: Math.round(properties.reduce((acc, p) => acc + p.occupancy, 0) / properties.length),
    monthlyRevenue: properties.reduce((acc, p) => {
      if (p.currentMode === "student") return acc + p.monthlyRate;
      if (p.currentMode === "tourist") return acc + p.nightlyRate * 20;
      return acc + p.monthlyRate + p.nightlyRate * 10;
    }, 0),
    avgReturn: 8.3,
    studentProperties: properties.filter((p) => p.currentMode === "student" || p.currentMode === "hybrid").length,
    touristProperties: properties.filter((p) => p.currentMode === "tourist" || p.currentMode === "hybrid").length,
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-border rounded-xl p-8">
        <h2 className="text-3xl font-bold font-serif text-foreground mb-2">Welcome back, Lorenzo</h2>
        <p className="text-muted-foreground text-lg">
          Your portfolio is performing well. {metrics.avgOccupancy}% occupancy across {metrics.totalProperties}{" "}
          properties.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Properties</p>
              <p className="text-3xl font-bold mt-2 text-foreground">{metrics.totalProperties}</p>
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-primary font-medium">Launch phase</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Avg Occupancy</p>
              <p className="text-3xl font-bold mt-2 text-foreground">{metrics.avgOccupancy}%</p>
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-primary font-medium">Above target</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold mt-2 text-foreground">€{metrics.monthlyRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-primary font-medium">Growing</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Avg Return</p>
              <p className="text-3xl font-bold mt-2 text-foreground">{metrics.avgReturn}%</p>
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-primary font-medium">Target: 7-9%</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Percent className="h-5 w-5 text-accent-foreground" />
            </div>
          </div>
        </Card>
      </div>

      {/* Business Model Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Student Housing</h3>
              <p className="text-sm text-muted-foreground">25% discount model</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Leases</span>
              <span className="font-semibold text-foreground">{metrics.studentProperties}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending Applications</span>
              <span className="font-semibold text-foreground">
                {applications.filter((a) => a.status === "pending").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Monthly Rate</span>
              <span className="font-semibold text-foreground">
                €
                {Math.round(
                  properties.filter((p) => p.currentMode === "student").reduce((acc, p) => acc + p.monthlyRate, 0) /
                    properties.filter((p) => p.currentMode === "student").length || 0
                )}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Plane className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Tourist Bookings</h3>
              <p className="text-sm text-muted-foreground">Academic break revenue</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Available Properties</span>
              <span className="font-semibold text-foreground">{metrics.touristProperties}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Upcoming Bookings</span>
              <span className="font-semibold text-foreground">
                {bookings.filter((b) => b.status === "confirmed").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Nightly Rate</span>
              <span className="font-semibold text-foreground">
                €
                {Math.round(
                  properties
                    .filter((p) => p.currentMode === "tourist" || p.currentMode === "hybrid")
                    .reduce((acc, p) => acc + p.nightlyRate, 0) /
                    properties.filter((p) => p.currentMode === "tourist" || p.currentMode === "hybrid").length || 0
                )}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Applications</h3>
          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {app.applicant.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{app.applicant}</p>
                    <p className="text-sm text-muted-foreground">{app.university}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      app.status === "approved" ? "default" : app.status === "reviewing" ? "secondary" : "outline"
                    }
                  >
                    {app.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Score: {app.score}/100</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Upcoming Bookings</h3>
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{booking.guest}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.checkIn} • {booking.nights} nights
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">€{booking.total}</p>
                  <p className="text-xs text-muted-foreground">{booking.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-6 text-foreground font-serif">Dual Revenue Model Performance</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Student Rentals (9 months)</span>
              <span className="font-semibold text-foreground">€3,825/mo</span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden border border-border">
              <div
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Tourist Stays (3 months)</span>
              <span className="font-semibold text-foreground">€2,550/mo</span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden border border-border">
              <div
                className="bg-gradient-to-r from-accent to-primary h-full rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              By combining student housing with tourist bookings during academic breaks, we maximize property
              utilization and deliver strong returns to investors while keeping rents affordable for students.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
