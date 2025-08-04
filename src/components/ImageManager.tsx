import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, Image } from "lucide-react";

const categories = [
  { id: "all", name: "All Images", icon: Image },
  { id: "gallery", name: "Gallery", icon: Folder },
  { id: "news", name: "News", icon: Folder },
  { id: "blog", name: "Blog", icon: Folder },
  { id: "products", name: "Products", icon: Folder },
  { id: "common", name: "Common", icon: Folder },
];

// 예시 이미지 배열
const mockImages = [
  { id: "1", category: "gallery" },
  { id: "2", category: "news" },
  { id: "3", category: "products" },
  { id: "4", category: "blog" },
  { id: "5", category: "common" },
];

export default function CategoryCard() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Folder Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const count =
              category.id === "all"
                ? mockImages.length
                : mockImages.filter((img) => img.category === category.id).length;

            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
                {...({
                  variant: selectedCategory === category.id ? "default" : "outline",
                  size: "sm",
                } as React.ComponentProps<typeof Button>)}
              >
                <Icon className="w-4 h-4" />
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
