import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface CategorySelectorProps {
  categories: Array<{
    id: string;
    name: string;
    is_premium: boolean;
  }>;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  isPremiumUser: boolean;
}

export const CategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isPremiumUser
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className="relative"
          disabled={category.is_premium && !isPremiumUser}
        >
          {category.name}
          {category.is_premium && !isPremiumUser && (
            <Lock className="w-4 h-4 ml-2 text-primary" />
          )}
        </Button>
      ))}
    </div>
  );
};