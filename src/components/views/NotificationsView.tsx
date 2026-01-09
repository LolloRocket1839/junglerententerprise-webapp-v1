import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CreditCard, 
  FileText, 
  Calendar, 
  MessageSquare,
  Check,
  Trash2,
  CheckCheck
} from "lucide-react";
import { notifications } from "@/lib/mock-data";
import type { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeIcons = {
  payment: CreditCard,
  application: FileText,
  booking: Calendar,
  message: MessageSquare,
  system: Bell,
};

const typeColors = {
  payment: "text-green-600 bg-green-100",
  application: "text-blue-600 bg-blue-100",
  booking: "text-purple-600 bg-purple-100",
  message: "text-orange-600 bg-orange-100",
  system: "text-gray-600 bg-gray-100",
};

export function NotificationsView() {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);
  const [filter, setFilter] = useState<string>("all");

  const filteredNotifications = filter === "all" 
    ? notificationsList 
    : notificationsList.filter(n => n.type === filter);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notifiche</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} non lette` : "Tutte lette"}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Segna tutte come lette
          </Button>
        )}
      </div>

      <Card className="jungle-card">
        <CardHeader>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="grid grid-cols-5 w-full max-w-lg">
              <TabsTrigger value="all">Tutte</TabsTrigger>
              <TabsTrigger value="payment">Pagamenti</TabsTrigger>
              <TabsTrigger value="application">Candidature</TabsTrigger>
              <TabsTrigger value="booking">Prenotazioni</TabsTrigger>
              <TabsTrigger value="system">Sistema</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nessuna notifica</h3>
              <p className="text-muted-foreground">
                Non ci sono notifiche in questa categoria
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const Icon = typeIcons[notification.type];
                const colorClass = typeColors[notification.type];
                
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-lg border transition-colors",
                      !notification.read && "bg-primary/5 border-primary/20"
                    )}
                  >
                    <div className={cn("p-2 rounded-lg", colorClass)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">Nuova</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => markAsRead(notification.id)}
                          title="Segna come letta"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                        title="Elimina"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
