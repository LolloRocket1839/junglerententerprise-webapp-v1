import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string | null;
  is_premium: boolean;
}

interface CategorySelectorProps {
  categories: Category[];
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={`p-4 cursor-pointer border
            shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)]
            transition-all duration-[350ms]
            hover:shadow-[0_16px_32px_hsl(0_0%_0%_/_0.16)] hover:-translate-y-1.5
            active:scale-[0.96] ${
            selectedCategory === category.id
              ? 'bg-primary/20 border-primary'
              : 'bg-background/50 hover:bg-background/60'
          } ${category.is_premium && !isPremiumUser ? 'opacity-50' : ''}`}
          onClick={() => {
            if (!category.is_premium || isPremiumUser) {
              onSelectCategory(category.id);
            }
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-white">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-white/60 mt-1">{category.description}</p>
              )}
            </div>
            {category.is_premium && !isPremiumUser && (
              <Lock className="w-5 h-5 text-primary" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};