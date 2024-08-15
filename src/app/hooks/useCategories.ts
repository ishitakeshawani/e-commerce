import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "~/trpc/react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface GetCategoriesResponse {
  categories: Category[];
  total: number;
  totalPages: number;
}

export const useCategories = (page: number) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [previousSelections, setPreviousSelections] = useState<number[]>([]);

  const { data, isLoading, isError } = api.category.getCategories.useQuery({
    page,
    pageSize: 6,
  }) as { data?: GetCategoriesResponse; isLoading: boolean; isError: boolean };

  const { data: userCategories } = api.category.getUserCategories.useQuery(userId ?? "", {
    enabled: !!userId,
  });

  const { mutate: selectCategory } = api.category.selectCategory.useMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { userId: string } = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userCategories) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      setSelectedCategories(userCategories.map((category) => category.id));
    }
  }, [userCategories]);

  const handleCategorySelect = (categoryId: number) => {
    const wasSelected = selectedCategories.includes(categoryId);
    const newSelections = wasSelected
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setPreviousSelections(selectedCategories); // Save the previous state before optimistic update

    setSelectedCategories(newSelections);

    if (userId) {
      selectCategory(
        { userId, categoryId, isSelected: !wasSelected  },
        {
          onError: (error) => {
            console.error("Error selecting category:", error);
            setSelectedCategories(previousSelections);
          },
        }
      );
    }
  };

  return {
    data,
    isLoading,
    isError,
    selectedCategories,
    handleCategorySelect,
  };
};
