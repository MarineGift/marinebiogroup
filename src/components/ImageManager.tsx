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
