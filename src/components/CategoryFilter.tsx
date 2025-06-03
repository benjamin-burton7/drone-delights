// components/CategoryFilter.tsx
type CategoryFilterProps = {
  categories: string[];
  activeFilter: string;
  setActiveFilter: (category: string) => void;
};

const CategoryFilter = ({
  categories,
  activeFilter,
  setActiveFilter,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 px-4 mb-10 md:gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`rounded-full px-5 py-2 shadow-sm transition-all ${
            activeFilter === category
              ? "bg-main-orange text-white"
              : "bg-white hover:bg-main-orange hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
