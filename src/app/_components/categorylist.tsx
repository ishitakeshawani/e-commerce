import { FC } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategories: number[];
  onSelect: (id: number) => void;
}

const CategoryList: FC<CategoryListProps> = ({ categories, selectedCategories, onSelect }) => (
  <ul className="my-2">
    {categories.map((category) => (
      <li key={category.id} className="py-1 flex items-center">
        <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selectedCategories.includes(category.id)}
          onChange={() => onSelect(category.id)}
          className="mr-2 cursor-pointer"
        />
        {category.name}
        </label>
      </li>
    ))}
  </ul>
);

export default CategoryList;
