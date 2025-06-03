import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";
import { useIsMobile } from "../../hooks/useIsMobile";

type ProductSectionProps = {
  title: string;
  products: Product[];
  showFavoriteButton?: boolean;
};

const ProductSection = ({
  title,
  products,
  showFavoriteButton = true,
}: ProductSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <section className="flex flex-col px-6 pb-[60px] md:px-[110px]">
      {/* Wrapper för rubrik + grid */}
      <div className="w-full max-w-[1200px] mx-auto">
        <h2 className="mb-5 text-3xl font-futura">{title}</h2>

        {products.length > 0 ? (
          <div
            className={`w-full ${
              isMobile
                ? "flex flex-col gap-6"
                : "grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                variant={isMobile ? "list" : "grid"}
                showFavoriteButton={showFavoriteButton}
              />
            ))}
          </div>
        ) : (
          <div className="text-lg text-gray-500 pb-[110px]">
            Du har inga produkter att visa.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
