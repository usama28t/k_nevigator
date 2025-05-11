import React from 'react';
import { Bell, Info, AlertTriangle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RecentUpdates = () => {
  const getBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'location':
        return <Info className="h-4 w-4" />;
      case 'schedule':
        return <AlertTriangle className="h-4 w-4" />;
      case 'teacher':
        return <Bell className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Recent Updates</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay informed about the latest changes to schedules and locations.
            </p>
          </div>
          <Button variant="outline">View All Updates</Button>
        </div>

        <div className="grid gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No updates found
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecentUpdates;