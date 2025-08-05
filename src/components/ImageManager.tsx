import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// @ts-ignore - Badge 타입 에러 일시적 무시
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
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.name}
                {/* @ts-ignore - Badge variant prop 타입 에러 무시 */}
                <Badge variant="secondary" className="text-xs ml-1">
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